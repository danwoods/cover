import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Issues } from './issues'
import { Publishers } from './publishers'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const Routes = () => (
  <Router>
    <Route path="/">
      <Issues />
      <Publishers />
    </Route>
  </Router>
)

const theme = createMuiTheme()

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}
