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
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import OpacityIcon from '@material-ui/icons/Opacity';
import GestureIcon from '@material-ui/icons/Gesture';
import BrushIcon from '@material-ui/icons/Brush';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

const useStyles = makeStyles((theme) => ({
  root: {
		//maxWidth: theme.spacing(20),
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  }
}))

const getWriters = (creators) => {
	return creators.filter(creator => {
		if(creator.role && creator.role === "writer") {
			return creator;
		} 
	});
};

const getArtists = (creators) => {
	return creators.filter(creator => {
		if(creator.role && (creator.role === "inker" || creator.role === "colorist" || creator.role === "penciler (cover)" || creator.role === "penciler" || creator.role === "letterer" || creator.role === "artist")) {
			return creator;
		} 
	});
};

const ICONS = {
	writer: <FormatQuoteIcon />,
	colorist: <ColorLensIcon />,
	inker: <OpacityIcon />,
	"penciler (cover)": <GestureIcon />,
	penciler: <GestureIcon />,
	letterer: <TextFormatIcon />,
	artist: <BrushIcon />
};

const IssueCard = (props) => {
	const classes = useStyles()

	const officialInfoUrl = props.urls.find((url) => url.type === 'detail')?.url
	
	const writers = getWriters(props.creators.items);
	const artists = getArtists(props.creators.items);

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
					<Typography color="textPrimary" component="h3">
							{'Writers: '}
						</Typography>
					<Paper component="ul" className={classes.paper} elevation={0}>
						{writers.map((data) => {
								return (
									<li key={data.name}>
										<Chip
											icon={ICONS[data.role]}
											label={data.name}
											className={classes.chip}
											component="a" 
											href={`#${data.name}`} 
											clickable
										/>
									</li>
								);
							})}
					</Paper>

					<Typography color="textPrimary" component="h3">
						{'Artists: '}
					</Typography>
					<Paper component="ul" className={classes.paper} elevation={0}>
					{artists.map((data) => {
							return (
								<li key={data.name}>
									<Chip
										icon={ICONS[data.role]}
										label={data.name}
										className={classes.chip}
										component="a" 
										href={`#${data.name}`} 
										clickable
									/>
								</li>
							);
						})}
					</Paper>
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
