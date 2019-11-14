import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useHistory
} from 'react-router-dom'

import PropTypes from 'prop-types'

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
  withStyles
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'

import axios from 'axios'
import JWT from 'jwt-client'

import Navigator from './Navigator'
import Content from './Content'
import Header from './Header'
import Login from './Login'
import Register from './Register'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#4287f5'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#4287f5', //blue background
      dark: '#006db3'
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  shape: {
    borderRadius: 8
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
})

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#262525'
      }
    },
    MuiButton: {
      label: {
        textTransform: 'none'
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none'
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1)
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1)
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: '#4287f5' //blue border
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  }
}

const drawerWidth = 256

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1'
  },
  footer: {
    padding: theme.spacing(1)
  }
}

function Main(props) {
  const { classes } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>
            <Router>
              <div className="App">
                <Switch>
                  <Route exact path="/">
                    <Content />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/register">
                    <Register />
                  </Route>
                  <Route exact path="/organizations">
                    <Organizations />
                  </Route>
                </Switch>
                <University />
                <Rso />
              </div>
            </Router>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

function University() {
  const classes = useStyles()

  const [name, setName] = React.useState('')
  const handleNameChange = event => {
    setName(event.target.value)
  }

  const [description, setDescription] = React.useState('')
  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const [numberOfStudents, setNumberOfStudents] = React.useState('')
  const handleNumberOfStudentsChange = event => {
    setNumberOfStudents(event.target.value)
  }

  const [address, setAddress] = React.useState('')
  const handleAddressChange = event => {
    setAddress(event.target.value)
  }

  const [lattitude, setLattitude] = React.useState('')
  const handleLattitudeChange = event => {
    setLattitude(event.target.value)
  }

  const [longitude, setLongitude] = React.useState('')
  const handleLongitudeChange = event => {
    setLongitude(event.target.value)
  }

  const [password, setPassword] = React.useState('')
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const history = useHistory()
  const handleSubmit = event => {
    event.preventDefault()
    const location = {
      name: name,
      address: address,
      lattitude: lattitude,
      longitude: longitude
    }

    axios
      .post('/university', {
        location: location,
        name: name,
        description: description,
        num_students: numberOfStudents,
        pictures: null
      })
      .then(response => {
        history.push('/')
      })
      .catch(error => {
        console.error(error)
      })
  }

  function renderCreateUniversity() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create a University
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              onChange={handleNameChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="University Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              onChange={handleDescriptionChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="University Description"
              name="description"
              autoComplete="description"
              autoFocus
            />
            <TextField
              onChange={handleNumberOfStudentsChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="numberOfStudents"
              label="University Number of Students"
              name="numberOfStudents"
              autoComplete="numberOfStudents"
              autoFocus
            />
            <TextField
              onChange={handleAddressChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Location Address"
              name="address"
              autoComplete="address"
              autoFocus
            />
            <TextField
              onChange={handleLattitudeChange}
              variant="outlined"
              margin="normal"
              required
              id="lattitude"
              label="Location Lattitude"
              name="lattitude"
              autoComplete="lattitude"
              autoFocus
            />
            <TextField
              onChange={handleLongitudeChange}
              variant="outlined"
              margin="normal"
              required
              id="longitude"
              label="Location Longitude"
              name="longitude"
              autoComplete="longitude"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
    )
  }

  function renderJoinUniversity() {
    let universities = null
    axios
      .get('/university')
      .then(response => {
        universities = response.data
      })
      .catch(error => {
        console.error(error)
      })

    // Edit code below to make it a drop down with the universities above
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Join a University
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              onChange={handleNameChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="University Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Join
            </Button>
          </form>
        </div>
      </Container>
    )
  }

  const match = useRouteMatch()
  return (
    <Router>
      <Switch>
        <Route exact path="/university/create">
          {renderCreateUniversity()}
        </Route>
        <Route exact path="/university/_join">
          {renderJoinUniversity()}
        </Route>
      </Switch>
    </Router>
  )
}

function Rso() {
  const classes = useStyles()

  const [name, setName] = React.useState('')
  const handleNameChange = event => {
    setName(event.target.value)
  }

  const [description, setDescription] = React.useState('')
  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const [numberOfStudents, setNumberOfStudents] = React.useState('')
  const handleNumberOfStudentsChange = event => {
    setNumberOfStudents(event.target.value)
  }

  const history = useHistory()
  const handleSubmit = event => {
    event.preventDefault()

    const userId = JWT.remember().claim.userId

    axios
      .post('/rso', {
        name: name,
        description: description,
        num_members: numberOfStudents,
        user: { id: userId }
      })
      .then(response => {
        history.push('/')
      })
      .catch(error => {
        console.error(error)
      })
  }

  function renderCreateRso() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create an RSO
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              onChange={handleNameChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="RSO Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              onChange={handleDescriptionChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="RSO Description"
              name="description"
              autoComplete="description"
              autoFocus
            />
            <TextField
              onChange={handleNumberOfStudentsChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="numberOfStudents"
              label="RSO Number of Students"
              name="numberOfStudents"
              autoComplete="numberOfStudents"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
    )
  }

  function renderJoinRso() {
    let rsos = null
    axios
      .get('/rso')
      .then(response => {
        rsos = response.data
      })
      .catch(error => {
        console.error(error)
      })

    // Edit code below to make it a drop down with the RSOs above
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Join an RSO
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              onChange={handleNameChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="University Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Join
            </Button>
          </form>
        </div>
      </Container>
    )
  }

  const match = useRouteMatch()
  return (
    <Router>
      <Switch>
        <Route exact path="/rso/create">
          {renderCreateRso()}
        </Route>
        <Route exact path="/rso/_join">
          {renderJoinRso()}
        </Route>
      </Switch>
    </Router>
  )
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Main)
