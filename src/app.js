import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Issues } from './issues'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
//import '@fontsource/roboto'

const Routes = () => (
  <Router>
    <Route path="/">
      <Issues />
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
