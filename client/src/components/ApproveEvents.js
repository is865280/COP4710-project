import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from "@material-ui/core/FormHelperText";
import JWT from 'jwt-client'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { List, ListItem, ListItemText } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Box from '@material-ui/core/Box'
import Check from '@material-ui/icons/Check'
import IconButton from '@material-ui/core/IconButton';








const useStyles = makeStyles(theme => ({

}));

export default function AppoveEvents(props) {
    const { getEvents } = props;
    const classes = useStyles();
    const [inital, setInital] = React.useState(0)
    const [events, setEvents] = React.useState([])
    const [open, setOpen] = React.useState(false)


    if (inital == 0) {
        getUnappovedEvents()
        setInital(1)
    }

    function getUnappovedEvents() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        axios
            .get('/event/unappoved')
            .then(response => {
                setEvents(response.data)
            })
            .catch(error => {
            })
    }

    function handleAppove(id, category) {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        if (category == 'public' || category == 'private') {
            axios
                .patch(`/event/${category}`, { event_id: id })
                .then(response => {
                    getUnappovedEvents()
                    getEvents()
                })
                .catch(error => {
                })
        }

    }
    function handleOpen() {
        getUnappovedEvents()
        setOpen(true)
    }


    return (
        <div>
            <Dialog onClose={e => { setOpen(false) }} aria-labelledby="dialog-title" open={open}>
                <DialogTitle id="dialog-title">{(events.length) ? 'Unappoved Events' : ' No unappoved events'}</DialogTitle>
                <div className={classes.root}>
                    <GridList cellHeight={"auto"} spacing={0} className={classes.gridList}>
                        {events.map(tile => (
                            <GridListTile key={tile.id} cols={2} rows={1}>
                                <Typography component="div">
                                    <Box textAlign="justify" m={2} mt={6}>{tile.description}</Box>
                                </Typography>
                                <GridListTileBar
                                    title={tile.name + ' (' + tile.category + ')'}
                                    titlePosition="top"
                                    actionIcon={<IconButton
                                        aria-label={`star ${tile.title}`}
                                        className={classes.icon}
                                        size={'small'}
                                        onClick={e => { handleAppove(tile.id, tile.category) }}>
                                        <Check />
                                    </IconButton>}
                                    actionPosition="right"
                                    className={classes.titleBar}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Dialog >
            <Button
                color="primary"
                variant="contained"
                onClick={e => { handleOpen() }}>
                Appove Events
            </Button>
        </div >
    );
}