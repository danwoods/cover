/** @file Handles API communications for publishers */
import Ajv from 'ajv'
import PouchDB from 'pouchdb'
import { useState, useEffect } from 'react'

/** URL for database */
const DATABASE_URL = process.env.DATABASE_URL

/** Database */
const db = new PouchDB(`${DATABASE_URL}/comics`)

/** AJV instance */
const ajv = new Ajv({ allErrors: true })

/**
 * Remove a item from array of publishers
 * @param {object[]} arr - Array of publishers
 * @param {string} id - ID of publisher to remove
 * @return {object[]} - Array with publisher (specified by `id`) removed
 */
const removeFromArray = (arr, id) => arr.filter((item) => item._id !== id)

/**
 * Update array of publishers by inserting or updating publisher (based on 'id')
 * @param {object[]} arr - Array of publishers
 * @param {object} doc - Publisher to add or update
 * @return {object[]} - Array of publishers with `doc` added or updated
 */
const updateInArray = (arr, doc) => {
  const arrClone = [...arr]
  const idOfExisting = arrClone.findIndex((item) => item._id === doc._id)

  if (idOfExisting !== -1) {
    arrClone[idOfExisting] = doc
  } else {
    arrClone.push(doc)
  }

  return arrClone
}

/**
 * Create new publisher
 * @param {object} newPublisher - New publisher data
 * @param {string} newPublisher.name - New publisher name
 * @return {Promise} - Result of the create call or validation errors
 */
const create = (newPublisher) => {
  const newPub = { ...newPublisher }

  /** Data required for creating publisher */
  const createSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://example.com/product.schema.json',
    title: 'Product',
    description: 'A product in the catalog',
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        minLength: 1,
      },
      name: {
        type: 'string',
        minLength: 1,
      },
      type: {
        type: 'string',
        pattern: '^PUBLISHER$',
      },
    },
    required: ['_id', 'name', 'type'],
    additionalProperties: false,
  }

  // Set defaults
  newPub.type = 'PUBLISHER'
  newPub._id = newPub.name.replace(' ', '', 'g')

  // Validate - if good, create in DB
  if (ajv.validate(createSchema, newPub)) {
    return db.put(newPub)
  }
  // If bad - return validation errors
  else {
    return Promise.reject(ajv.errors)
  }
}

/**
 * Remove publisher from database
 * @param {string} id - Publisher ID
 * @param {string} rev - Doc rev
 * @return {Promise} - Result of putting with `deleted: true`
 */
const remove = (id, rev) => db.put({ _id: id, _rev: rev, _deleted: true })

/**
 * @typedef {object} UsePublisherObject
 * @property {object[]} publishers - Live updating array of publishers
 * @property {function} create - Function to create new publishers; ({name}) => Promise
 */

/**
 * Connect with publisher data
 * @returns {UsePublisherObject} - Publisher functionality
 */
export const usePublishers = () => {
  const [publishers, setPublishers] = useState([])

  const resetPublishers = () =>
    db
      .query('publishers/all', { include_docs: true })
      .then((result) => setPublishers(result.rows.map((row) => row.doc)))

  useEffect(() => {
    resetPublishers()
    // This feels like it should happen once, not every time someone calls `usePublisher`
    const disconnect = db
      .changes({
        return_docs: true,
        since: 'now',
        live: true,
        include_docs: true,
        filter: '_view',
        view: 'publishers/all',
      })
      .on('change', function (change) {
        // handle change
        if (change.deleted === true) {
          setPublishers((publishers) =>
            removeFromArray(publishers, change.doc._id)
          )
        } else {
          setPublishers((publishers) => updateInArray(publishers, change.doc))
        }
      })
      .on('error', function (err) {
        console.error(err)
      })

    return disconnect
  }, [])

  return {
    create,
    publishers,
    remove: (id) => {
      const existingPub = publishers.find((pub) => pub._id === id)

      if (existingPub) {
        return (
          remove(existingPub._id, existingPub._rev)
            // Not sure why the changes feed isn't picking up local deletions
            .then(resetPublishers)
        )
      } else {
        return Promise.reject('NO_MATCHING_PUBLISHER_FOUND')
      }
    },
  }
}
