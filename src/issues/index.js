import React from 'react'
import { useIssuesDB } from './api.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { List } from './list'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const issueLookup = (id) =>
  fetch(process.env.MARVEL_LOOKUP_URL + '/' + id).then((resp) => resp.json())

export const Issues = () => {
	const DEFAULT_UPC_CODE = '75960609709800311'
	const ISSUE_NOT_FOUND = 'Issue not found.'
  const { create, issues } = useIssuesDB()
	const [newIssueId, setNewIssueId] = React.useState(DEFAULT_UPC_CODE)
	const [newIssue, setNewIssue] = React.useState(null)
	const [hasError, setHasError] = React.useState(false)
	const [hasSuccess, setHasSuccess] = React.useState(false) 

  const createNewIssue = () => {
		issueLookup(newIssueId)
			.then((resp) => {
				if(resp.data) {
					// no issue found
					throw ISSUE_NOT_FOUND;
				} else {
					// got an issue back
					setNewIssue(resp);
					setHasError(false);
					return resp;
				}
			})
			.then((resp) => create({ ...resp, upc: newIssueId }))
			.then(() => {
				setHasSuccess(true)
				setNewIssueId(DEFAULT_UPC_CODE)
			})
			.catch(error => {
				if(error === ISSUE_NOT_FOUND) {
					setHasError(true);
				}
			})
	}
	
	const closeErrorSnackbar = () => {
		setHasError(false);
		setNewIssueId(DEFAULT_UPC_CODE);
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

			<Snackbar open={hasError} autoHideDuration={6000} onClose={closeErrorSnackbar}>
        <MuiAlert onClose={closeErrorSnackbar} severity="error">
          {`Issue ${newIssueId} not found!`}
        </MuiAlert>
      </Snackbar>

			<Snackbar open={hasSuccess} autoHideDuration={6000} onClose={() => setHasSuccess(false)}>
        <MuiAlert onClose={() => setHasSuccess(false)} severity="success">
          {newIssue !==  null ? `${newIssue.title} added!` : 'Issue added!'}
        </MuiAlert>
      </Snackbar>
    </Router>
  )
}
