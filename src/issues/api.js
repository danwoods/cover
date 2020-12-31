/** @file Handles API communications */

import useSWR from 'swr'
import PouchDB from 'pouchdb'

const DATABASE_URL = process.env.DATABASE_URL

const db = new PouchDB(`${DATABASE_URL}/issues`)

export const useIssue = (id) => {
  const update = ''
  const remove = ''

  const { data: issue } = useSWR(`issues/${id}`, db.get(id))

  return {
    issue,
    update,
    remove,
  }
}

export const useIssuesDB = () => {
  const { data: issues = [], mutate } = useSWR('issues/', () =>
		db.query('queries/by_title', { include_docs: true }).then((result) => result.rows)
  )

  return {
    create: (newIssue) => db.post(newIssue).then(() => mutate(issues)),
    getInfo: db.info,
    issues,
  }
}
