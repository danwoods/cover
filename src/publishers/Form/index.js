/** @file Form to add publisher */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

/**
 * Basic form containing a single input, a name, to create a publisher
 * @param {Function} onNameChange - string => any
 * @param {string} nameValue - Value for input
 * @param {Function} onSubmit - Callback for submitting
 * @param {string} [className] - Optional classname for root <form />  element
 * @return {React.Component} - Form
 */
export const Form = ({ onNameChange, nameValue, onSubmit, className }) => {
  const classes = useStyles()

  return (
    <form className={classNames(classes.root, className)} noValidate>
      <TextField
        id="publisher-name"
        label={'Name'}
        value={nameValue}
        onChange={(evt) => onNameChange(evt.target.value)}
        required
      />
      <Button onClick={onSubmit}>{'Add'}</Button>
    </form>
  )
}
