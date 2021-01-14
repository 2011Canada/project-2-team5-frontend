import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../actions';
import { Redirect } from 'react-router';
import { Alert, AlertTitle } from '@material-ui/lab';

import { MakeAnAlias, GetLocationName, GetCurrentAlias } from '../utils/uri-fuctions.js';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import EditProfile from './EditProfile';

function Copyright() {
    return (
        <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: '#242422',
        width: '100vw',
        height: '100',
        color: 'white',
    },
    paper: {
        paddingTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        color: 'white',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cssLabel: {
        color: 'white',
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `white`,
        },
    },

    multilineColor: {
        color: 'white',
    },
    cssFocused: {},

    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important',
    },
}));


export default function Profile() {

    const classes = useStyles();

    //const user = useSelector((state) => state.authenticated);

    const userOld = {
        "userId": 1,
        "firstName": "Heng",
        "lastName": "Wang",
        "userName": "HengWang",
        "userPassword": "C5IDc2I7OAg+yLf9ataZVMmVe5+KNmShy+pZBm5K1tk=",
        "email": "heng.wang@revature.net",
        "photo": null,
        "salt": null,
        "currentLocationId": 1
    };
    const [user, setUser] = useState(userOld);

    const [newAliasName, setNewAliasName] = useState("");

    const [currentAliasName, setCurrentAliasName] = useState("");

    const [currentLocationName, setCurrentLocationName] = useState("");

    const dispatch = useDispatch();

    function changeHandler(event) {
        const newName = event.target.value;
        setNewAliasName(newName);
    };

    // componentDidMount() {
    //     let currentLocation = GetLocationName(user.currentLocationId);
    //     console.log(`currentLocation = ${currentLocation}`)

    //     setCurrentLocationName(currentLocation);
    // }

    useEffect(() => {

        const getLocationName = async () => {
            let currentLocation = await (GetLocationName(user.currentLocationId));
            console.log(`currentLocation = ${currentLocation}`)

            setCurrentLocationName(currentLocation);
        }

        getLocationName();

    }, [currentAliasName]);

    console.log(currentLocationName);

    function handleSubmit(event) {

        event.preventDefault();

        MakeAnAlias(user.userId, newAliasName);

        const updateAliasName = async () => {
            let currentAlias = await (GetCurrentAlias(user.userId));
            console.log(`currentAlias = ${currentAlias}`)

            setCurrentAliasName(currentAlias);
        }

        updateAliasName();
    };

    function handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        user[name] = value;
        setUser(user);
        console.log(user)
    };

    //Redirect to="/dashboard" (
    //   <p />
    // ) :

    //console.log(user);

    return user && (
        <div className={classes.root}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <br />
                    <br />
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>User ID:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>{user.userId}</p>
                    </div>
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>Email:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>{user.email}</p>
                    </div>
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>Username:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>{user.userName}</p>
                    </div>
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>Current Location:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>currentLocationName</p>
                    </div>
                    <br/>
                    <BrowserRouter>
                        <Route path="/profile/edit" exact component={EditProfile} />
                        <Link to="/profile/edit">Edit Profile</Link>
                    </BrowserRouter>
                    <br/>
                    <div style={{ border: "1px solid white", width: "100%", borderRadius: "7px", padding: "10px", marginTop: "5px", marginBottom: "5px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>Current Alias:</h5>
                        <p style={{ marginTop: "5px", marginBottom: "5px" }}>{currentAliasName}</p>
                    </div>
                    {/* <TextField
                        defaultValue={currentLocation}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="currentLocationId"
                        label="Current Location"
                        name="currentLocationId"
                        autoFocus
                        InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                                input: classes.multilineColor,
                            },
                        }}
                    /> */}
                    {/* <TextField
                        defaultValue={currentAlias}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="currentAlias"
                        label="Current Alias"
                        name="currentAlias"
                        autoFocus
                        InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                                input: classes.multilineColor,
                            },
                        }}
                    /> */}
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <h3>Create New Alias</h3>
                        <TextField
                            placeholder="Alias Name"
                            onChange={(e) => changeHandler(e)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="newAlias"
                            label="Alias Name"
                            name="newAlias"
                            autoFocus
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                    input: classes.multilineColor,
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Create</Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}