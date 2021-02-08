/** @file Publisher list */
import Avatar from '@material-ui/core/Avatar'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import MUIList from '@material-ui/core/List'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { usePublishers } from '../api.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  listContainer: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}))

export const List = () => {
  const classes = useStyles()
  const { publishers, remove } = usePublishers()

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {'Publishers'}
      </Typography>
      <div className={classes.listContainer}>
        <MUIList dense={false}>
          {publishers.map((pub) => (
            <ListItem key={pub._id}>
              <ListItemAvatar>
                <Avatar>{pub.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={pub.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => remove(pub._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </MUIList>
      </div>
    </div>
  )
}
