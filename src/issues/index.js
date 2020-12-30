import React from 'react'
import { useIssuesDB } from './api.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { List } from './list'

const issueLookup = (id) =>
  fetch(process.env.MARVEL_LOOKUP_URL + '/' + id).then((resp) => resp.json())

export const Issues = () => {
  const DEFAULT_UPC_CODE = '75960609709800311'
  const { create, issues } = useIssuesDB()
  const [newIssueId, setNewIssueId] = React.useState(DEFAULT_UPC_CODE)

  const createNewIssue = () => {
    issueLookup(newIssueId)
      .then((resp) => create({ ...resp, upc: newIssueId }))
      .then(() => setNewIssueId(DEFAULT_UPC_CODE))
  }

  return (
    <Router>
      <Route path="/">
        <div>{`Number of issues: ${issues.length}`}</div>
        {issues && issues.length > 0 ? <List items={issues} /> : null}
      </Route>
      <input
        type={'text'}
        value={newIssueId}
        onChange={(evt) => setNewIssueId(evt.target.value)}
      />
      <button onClick={createNewIssue}>{'Add New'}</button>
    </Router>
  )
}
