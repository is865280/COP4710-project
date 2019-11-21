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
    const [category, setCategory] = React.useState('')
    const [university, setUniversity] = React.useState('')
    const [RSO, setRSO] = React.useState('')
    const [RSOs, setRSOs] = React.useState([])
    const [name, setName] = React.useState('')
    const [time, setTime] = React.useState('')
    const [date, setDate] = React.useState('')
    const [dateErr, setDateErr] = React.useState(0)
    const [description, setDescription] = React.useState('')
    const [inital, setInital] = React.useState(0)

    const times = [{ v: "1am", a: "010000" }, { v: "2am", a: "020000" }, { v: "3am", a: "030000" }, { v: "4am", a: "040000" }, { v: "5am", a: "050000" },
    { v: "6am", a: "060000" }, { v: "7am", a: "070000" }, { v: "8am", a: "080000" }, { v: "9am", a: "090000" }, { v: "10am", a: "100000" },
    { v: "11am", a: "110000" }, { v: "12pm", a: "120000" }, { v: "1pm", a: "130000" }, { v: "2pm", a: "140000" }, { v: "3pm", a: "150000" },
    { v: "4pm", a: "160000" }, { v: "5pm", a: "170000" }, { v: "6pm", a: "180000" }, { v: "7pm", a: "190000" }, { v: "8pm", a: "200000" },
    { v: "9pm", a: "210000" }, { v: "10pm", a: "220000" }, { v: "11pm", a: "230000" }, { v: "12am", a: "240000" }]

    if (inital == 0) {
        getRSOs()
        setInital(1)
    }

    function getRSOs() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        axios
            .get('/admin/rso')
            .then(response => {
                setRSOs(response.data)
            })
            .catch(error => {
            })
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = () => {
        if (DateTime.isValid(date, 'YYYY-MM-DD')) {
            var newEvent = {
                name: name,
                time: time,
                date: date,
                category: category,
                description: description,
                rso_id: RSO,
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
                .post('/event', newEvent)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                })

            handleClose()
            setDateErr(0)
        } else setDateErr(1)
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
                    <Typography variant="h6" className={classes.typography}>Add New Event</Typography>
                    <div className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                label="Event Name"
                                type="text"
                                margin="dense"
                                className={classes.textField}
                                onChange={e => { setName(e.target.value) }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={category}
                                onChange={e => { setCategory(e.target.value) }}
                                className={classes.selectEmpty}
                                displayEmpty
                            >
                                <MenuItem value={''} disabled>Pick One</MenuItem>
                                <MenuItem value={'rso'}>RSO</MenuItem>
                                <MenuItem value={'public'}>Public</MenuItem>
                                <MenuItem value={'private'}>Private</MenuItem>
                            </Select>
                            <FormHelperText>Category</FormHelperText>
                        </FormControl>
                        {(category == 'rso') ?
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={RSO}
                                    onChange={e => { setRSO(e.target.value) }}
                                    className={classes.selectEmpty}
                                >{RSOs.map(tile => (
                                    <MenuItem value={tile.RSO_id}>{tile.name}</MenuItem>
                                ))}
                                </Select>
                                <FormHelperText>RSO</FormHelperText>
                            </FormControl>
                            : ''}
                    </div>
                    <div className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={time}
                                onChange={e => { setTime(e.target.value) }}
                                className={classes.selectEmpty}
                                displayEmpty
                            >
                                {times.map(tile => (
                                    <MenuItem key={tile.a} value={tile.a}>{tile.v}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>time</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                error={dateErr == 1}
                                helperText={(dateErr) ? "Invalid Date" : ''}
                                label="Date"
                                type="date"
                                margin="dense"
                                placeholder="YYYY-MM-DD"
                                className={classes.textField}
                                onChange={e => { setDate(e.target.value) }}
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