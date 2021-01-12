import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
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
        "userId": 7,
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

    const [aliasName, setAliasName] = useState("");

    const currentLocation = GetLocationName(user.currentLocationId);

    const currentAlias = GetCurrentAlias(user.userId);

    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();

        //const aliasName = event.target.value;

        MakeAnAlias(user.userId, aliasName);
        
    }

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
                    <Typography component="h1" variant="h5">
                        {user.firstName} {user.lastName}
                    </Typography>

                    <TextField
                        onChange={(e) => handleOnChange(e)}
                        defaultValue={user.userId}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userId"
                        label="User ID"
                        name="userId"
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

                    <TextField
                        onChange={(e) => handleOnChange(e)}
                        defaultValue={user.email}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="pemail"
                        autoComplete="current-email"
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
                    <TextField
                        onChange={(e) => handleOnChange(e)}
                        defaultValue={user.userName}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="userName"
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
                    <TextField
                        onChange={(e) => handleOnChange(e)}
                        defaultValue={user.userPassword}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="userPassword"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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
                    <TextField
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
                    />
                    <TextField
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
                    />
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <h3>Create New Alias</h3>
                        <TextField
                            placeholder="Alias Name"
                            onChange={setAliasName}
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