/** @file Main entry point for `/publishers` code */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Form } from './Form'
import { usePublishers } from './api.js'

/**
 * Publisher routes
 * @returns {BrowserRouter} - Publisher routes
 */
export const Publishers = () => {
  const { publishers } = usePublishers()

  return (
    <Router>
      {publishers.map((pub) => (
        <div key={pub.id}>{pub.name}</div>
      ))}
      <Route path={'/publishers'}>
        <Route path={'/publishers/create'}>
          <Form />
        </Route>
      </Route>
    </Router>
  )
}
