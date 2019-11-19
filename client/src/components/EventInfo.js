import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { List, ListItem, ListItemText } from '@material-ui/core'
import JWT from 'jwt-client'
import axios from 'axios'
import { from } from 'rxjs'



const EventInfo = (props) => {
    const { onClose, selectedValue, open } = props;

    const [event, setEvent] = React.useState([])

    const [inital, setInital] = React.useState(0)


    if (inital == 0) {
        getEvent()
        setInital(1)
    }

    function getEvent() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        axios
            .get(`/event/info/${selectedValue}`)
            .then(response => {
                setEvent(response.data)
            })
            .catch(error => {
            })
    }

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = value => {
        onClose(value);
    };
    if (event[0]) {
        return (
            <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
                <DialogTitle id="dialog-title">{event[0].name}</DialogTitle>
                <List>
                    <ListItem  >
                        <ListItemText primary={event[0].category} />
                    </ListItem>
                    <ListItem  >
                        <ListItemText primary={event[0].description} />
                    </ListItem>
                </List>
            </Dialog>
        )
    }

    return null
}

export default EventInfo