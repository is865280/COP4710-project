import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Add from '@material-ui/icons/Add';
import JWT from 'jwt-client'
import axios from 'axios'
import { from } from 'rxjs';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 350,
    },
    gridList: {
        transform: 'translateZ(0)',
        background: '#FFFFFF'
    },
    commentBar: {
        background: 'rgba(0,100,250,1) 70%'
    },
    titleBar: {
        background: 'rgba(0,100,250,1) 70%'
    },
    icon: {
        color: 'white',
    },
}));

export default function AdvancedGridList(props) {
    const classes = useStyles();
    const { loadComments, setLoadComments, selectedValue } = props;
    const [text, setText] = React.useState('');
    const [rating, setRating] = React.useState(0)

    const handleChange = event => {
        setText(event.target.value);
    };

    function addComment() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        var comment = { rating: rating, text: text, event_id: selectedValue }
        axios
            .post(`/comments/`, comment)
            .then(response => {
                setLoadComments(0)
                setText('')
                setRating(0)
            })
            .catch(error => {
            })
    }


    return (
        <form className={classes.commentBar} noValidate autoComplete="off" >
            <div >
                <TextField
                    id="outlined-textarea"
                    label=""
                    placeholder="Comment..."
                    multiline
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    background='#FFFFFF'
                    value={text}
                    onChange={handleChange}
                />
                <IconButton aria-label={`star1`} className={classes.icon} size={'small'} onClick={(e) => { setRating(1) }}>
                    {(rating > 0) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <IconButton aria-label={`star2`} className={classes.icon} size={'small'} onClick={(e) => { setRating(2) }}>
                    {(rating > 1) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <IconButton aria-label={`star3`} className={classes.icon} size={'small'} onClick={(e) => { setRating(3) }}>
                    {(rating > 2) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <IconButton aria-label={`star4`} className={classes.icon} size={'small'} onClick={(e) => { setRating(4) }}>
                    {(rating > 3) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <IconButton aria-label={`star5`} className={classes.icon} size={'small'} onClick={(e) => { setRating(5) }}>
                    {(rating > 4) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <IconButton aria-label={`submit`} className={classes.icon} onClick={(e) => { addComment() }}>
                    <Add fontSize={'large'} />
                </IconButton>
            </div>
        </form>
    );
}