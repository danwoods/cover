/** @file Main entry point for `/publishers` code */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Form } from './Form'
import { List } from './List'

/**
 * Publisher routes
 * @returns {BrowserRouter} - Publisher routes
 */
export const Publishers = () => {
  return (
    <Router>
      <Route path={'/publishers'}>
        <List />
        <Route path={'/publishers/create'}>
          <Form />
        </Route>
      </Route>
    </Router>
  )
}
