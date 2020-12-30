/** @file List (gallery) for issues */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: theme.spacing(20),
  },
}))

const IssueCard = (props) => {
  const classes = useStyles()

  const officialInfoUrl = props.urls.find((url) => url.type === 'detail')?.url

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component={'img'}
          alt={'Cover Image'}
          height={140}
          image={`${props?.thumbnail?.path}.${props?.thumbnail?.extension}`}
          title={`${props.title} Cover Image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {'Some Description'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a target={'_blank'} rel={'noopener noreferrer'} href={officialInfoUrl}>
          <Button>{'Marvel Official'}</Button>
        </a>
      </CardActions>
    </Card>
  )
}

const listStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    columnGap: theme.spacing(2) + 'px',
    rowGap: theme.spacing(2) + 'px',
  },
}))

export const List = (props) => {
  const classes = listStyles()
  return (
    <section className={classes.root}>
      {props.items.map((doc) => (
        <div key={doc.id}>
          <IssueCard {...doc.doc} />
        </div>
      ))}
    </section>
  )
}
