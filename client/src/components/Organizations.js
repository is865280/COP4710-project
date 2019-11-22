import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'

import JWT from 'jwt-client'

import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'
import RSOInfo from './RSOInfo'
import NewRSO from './NewRSO'

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
  contentWrapper: {
    margin: '40px 16px'
  }
})


function Content(props) {
  const { classes } = props

  const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const [inital, setInital] = React.useState(0)
  const [events, setEvents] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('loading');

  const handleClickOpen = (value) => {
    setSelectedValue(value)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (inital == 0) {
    getEvents()
    setInital(1)
  }

  function getEvents() {
    setOpen(false)
    const token = JWT.get()
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    axios
      .get('/rso')
      .then(response => {
        setEvents(response.data)
      })
      .catch(error => {
      })
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClickPop = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePop = () => {
    setAnchorEl(null)
  }

  const openPop = Boolean(anchorEl);
  const idPop = open ? 'simple-popover' : undefined;

  function Events(props) {
    const classes = useStyles();


    if (events.length != 0) {
      var eventFeed = events || []
      return (
        <Grid container spacing={3}>
          {eventFeed.map((item, index) =>
            <Grid key={item.id} item md={4} onClick={(e) => { console.log(item.id); handleClickOpen(item.id) }}>
              <Card color="primary" className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    members: {item.num_members}<br />
                    {(item.active) ? 'active' : 'inactive'}
                  </Typography>
                  <Typography component="p" >
                    {(item.description.length <= 100) ? item.description : item.description.substring(0, 100) + "..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>)
          }
          <RSOInfo selectedValue={selectedValue} open={open} onClose={setOpen} getEvents={getEvents} />
        </Grid >
      )
    }
    return (<Typography color="textSecondary" align="center">
      No organizations found
  </Typography>)

  }

  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
            </Grid>
            <Grid item xs>
              Organization Feed
            </Grid>
            <Grid item >
              <NewRSO />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.addUser}
                onClick={getEvents}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>

        <Events />
      </div>
    </Paper>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Content)
