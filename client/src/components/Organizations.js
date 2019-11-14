import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'

const styles = theme => ({
  paper: {
    maxWidth: 1236,
    margin: 'auto',
    overflow: 'hidden'
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  card: {
    maxWidth: 300,
  },
  media: {
    height: 110,
  },
  contentWrapper: {
    margin: '40px 16px'
  }
})

function Content(props) {
  const { classes } = props

  return (
    <Grid item>
      <Typography gutterBottom variant="h5" component="h2">
        Featured
          </Typography>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image='./imgs/RoundtableLogoDark.png'
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Event
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Event descripton
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Content)
