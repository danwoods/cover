/** @file Handles API communications */

import useSWR from 'swr'
import PouchDB from 'pouchdb'

const DATABASE_URL = 'http://134.122.4.19:5984'

const db = new PouchDB(`${DATABASE_URL}/issues`)

export const useIssue = (id) => {
  const update = ''
  const remove = ''

	const {data: issue} = useSWR(`issues/${id}`, db.get(id))

  return {
    issue,
    update,
    remove,
  }
}

export const useIssuesDB = () => ({
  create: db.post,
  getInfo: db.info,
  getDocs: db.allDocs,
})
