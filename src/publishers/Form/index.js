/** @file Form to add publisher */
import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { usePublishers } from '../api.js'

/**
 * Validate name (just needs to have some characters)
 * @param {string} name - Name to validate
 * @return {boolean} - Whether or not `name` is valid
 */
const isNameValid = (name) => name.replace(' ', '', 'g').length > 0

/** Styling function */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

/**
 * Basic form containing a single input (a name), to create a publisher
 * @param {Function} onNameChange - string => any
 * @param {string} nameValue - Value for input
 * @param {Function} onSubmit - Callback for submitting
 * @param {boolean} isSubmitDisabled - Whether or not the `submit` button is disabled
 * @param {string} [className] - Optional classname for root <form />  element
 * @return {React.Component} - Form
 */
const Component = ({
  className,
  isSubmitDisabled,
  nameValue,
  onNameChange,
  onSubmit,
}) => {
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
      <Button onClick={onSubmit} disabled={isSubmitDisabled}>
        {'Add'}
      </Button>
    </form>
  )
}

/**
 * Wrapper for publisher form that supplies all props
 * @return {Component} - Wrapped form
 */
export const Form = () => {
  // State /////////////////////////////

  /** User entered name */
  const [name, setName] = useState('')

  /** Whether or not the submit button is disabled */
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(!isNameValid(name))

  /** Create function */
  const { create } = usePublishers()

  // Effects ///////////////////////////

  // Respond to changes in the `name` field
  useEffect(() => {
    setIsSubmitDisabled(!isNameValid(name))
  }, [name])

  // Functionality /////////////////////

  /** Handle submit */
  const onSubmit = () => {
    setIsSubmitDisabled(true)
    create({ name })
      .catch(console.error)
      .then(() => setName(''))
  }

  // Return ////////////////////////////

  return (
    <Component
      isSubmitDisabled={isSubmitDisabled}
      nameValue={name}
      onNameChange={setName}
      onSubmit={onSubmit}
    />
  )
}
