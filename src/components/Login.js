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
    height: '100vh',
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

export default function SignIn() {
  const user = useSelector((state) => state.authenticated);
  const message = useSelector((state) => state.errorMessage);
  console.log(message);

  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    const cred = {
      username: username,
      password: password,
    };
    dispatch(auth.login(cred));
  }

  return user ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {message !== '' && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>{message}</strong>
            </Alert>
          )}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
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
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
