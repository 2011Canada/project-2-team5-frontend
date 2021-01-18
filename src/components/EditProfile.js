import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { auth, userAction } from '../actions';
import { Alert, AlertTitle } from '@material-ui/lab';

import {
  MakeAnAlias,
  GetLocationName,
  GetCurrentAlias,
} from '../utils/uri-fuctions.js';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Profile from './Profile';

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Spybook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#303030',
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

export default function EditProfile() {
  const classes = useStyles();

  const user = useSelector((state) => state.authenticated);

  const [newEmail, setNewEmail] = useState('');

  const [newUsername, setNewUsername] = useState('');

  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();

    const newUser = user;

    let flag = false;

    if (newEmail !== '') {
      newUser.email = newEmail;
    }
    if (newUsername !== '') {
      newUser.userName = newUsername;
    }
    if (newPassword !== '') {
      newUser.userPassword = newPassword;
      flag = true;
    }

    await dispatch(userAction.updateUser(flag, newUser));

    // user.email = newEmail;
    // user.userName = newUsername;
    // user.userPassword = newPassword;

    //call some function
  }

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            {user.firstName} {user.lastName}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <h3>Edit Profile</h3>
            <TextField
              onChange={(e) => setNewEmail(e.target.value)}
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
              onChange={(e) => setNewUsername(e.target.value)}
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
              onChange={(e) => setNewPassword(e.target.value)}
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
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="secondary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          <Route path="/profile" exact component={Profile} />
          <Link to="/profile">cancel</Link>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
