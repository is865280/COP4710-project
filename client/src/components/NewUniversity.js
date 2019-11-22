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
import DateTime from 'date-and-time'








const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    BigField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function SimplePopover() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [inital, setInital] = React.useState(0)


    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = () => {
        var newUniversity = {
            name: name,
            description: description,
            location: {
                name: "home",
                address: "1234 red rock",
                latitude: "123.123",
                longitude: "123.123"
            }
        }
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        axios
            .post('/university', newUniversity)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
            })

        handleClose()
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button
                aria-describedby={id}
                color="primary"
                variant="contained"
                onClick={handleClick}>
                Add
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div className={classes.typography}>
                    <Typography variant="h6" className={classes.typography}>Add New university</Typography>
                    <div className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                label="University Name"
                                type="text"
                                margin="dense"
                                className={classes.textField}
                                onChange={e => { setName(e.target.value) }}
                            />
                        </FormControl>
                    </div>
                    <div className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-textarea"
                                label=""
                                placeholder="Description..."
                                multiline
                                variant="outlined"
                                className={classes.BigField}
                                margin="normal"
                                value={description}
                                onChange={e => { setDescription(e.target.value) }}
                            />
                        </FormControl>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={e => { handleSubmit() }}
                    >
                        Add
                </Button>
                </div>
            </Popover>
        </div >
    );
}