import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Form } from './Form'

export const Publishers = () => (
  <Router>
    <Route path={'/publishers'}>
      <Route path={'/publishers/create'}>
        <Form />
      </Route>
    </Route>
  </Router>
)
