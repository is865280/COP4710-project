import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { List, ListItem, ListItemText } from '@material-ui/core'
import JWT from 'jwt-client'
import axios from 'axios'
import { from } from 'rxjs'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { makeStyles } from '@material-ui/core/styles';
import color from '@material-ui/core/colors/blue'
import Box from '@material-ui/core/Box';

import Comments from './Comments'
import NewComment from './NewComment'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: color,
    },
    gridList: {
        width: 500,
    },
    card: {
        minWidth: 500,
        display: 'flex',
        p: 1
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
    grow: {
        flexGrow: 1,
    }
}));

const RSOInfo = (props) => {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const [rso, setRSO] = React.useState([])
    const [isMem, setIsMem] = React.useState(0)
    const [comments, setComments] = React.useState([])

    const [inital, setInital] = React.useState(0)
    const [loadComments, setLoadComments] = React.useState(0)


    if (inital == 0) {
        getRSO()
        isInRSO()
        setInital(1)
    }

    function getRSO() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        axios
            .get(`/rso/info/${selectedValue}`)
            .then(response => {
                setRSO(response.data)
            })
            .catch(error => {
            })
    }
    function isInRSO() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        axios
            .get(`/rso/in/${selectedValue}`)
            .then(response => {
                setIsMem(response.data.isMember)
            })
            .catch(error => {
            })
    }

    function handleJoin() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        if (!isMem) {
            console.log('joining')
            axios
                .post(`/rso/join/`, { rso_id: rso[0].id })
                .then(response => {
                    setRSO(response.data)
                })
                .catch(error => {
                })
        } else {
            axios
                .delete(`/rso/join/`, { data: { rso_id: rso[0].id } })
                .then(response => {
                    setRSO(response.data)
                })
                .catch(error => {
                })
        }
    }

    const handleClose = (e) => {
        console.log('closing')
        onClose();
    };

    // const handleListItemClick = value => {
    //     onClose(value);
    // };
    if (rso[0]) {
        return (
            <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open} >
                <div style={{ width: 500 }}>
                    <Box display="flex" p={1}>
                        <Box p={1} flexGrow={1} >
                            <Typography>{rso[0].name}</Typography>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={e => { handleJoin(rso[0].id) }}
                        >
                            {(isMem) ? 'Leave' : 'Join'}
                        </Button>
                    </Box>
                </div>
                <List>
                    <ListItem  >
                        <ListItemText primary={'members: ' + rso[0].num_members} />
                    </ListItem>
                    <ListItem  >
                        <ListItemText primary={(rso[0].active) ? 'Active' : 'Inactive'} />
                    </ListItem>
                    <ListItem  >
                        <ListItemText primary={rso[0].description} />
                    </ListItem>
                </List>
            </Dialog >
        )
    }

    return null
}

export default RSOInfo