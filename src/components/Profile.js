import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';

import {
  MakeAnAlias,
  GetCurrentAlias,
  GetAllUserAliases,
  UpdateAlias,
} from '../utils/uri-fuctions.js';

import { Route, Link } from 'react-router-dom';

import EditProfile from './EditProfile';
import { Card, CardActions, CardContent, Grid } from '@material-ui/core';

import hammad from '../profile_images/hammad.jpg';
import heng from '../profile_images/heng.jpg';
import stephen from '../profile_images/stephen.jpg';
import tristan from '../profile_images/tristan.jpg';
import alias1 from '../profile_images/alias1.jpg';

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
    height: '100%',
    color: 'white',
  },
  cardsRoot: {
    flexGrow: 1,
    background: '#303030',
    width: '90vw',
    height: '100%',
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    maxWidth: 200,
    textAlign: 'left',
    alignContent: 'center',
    alignItems: 'center',
  },
  media: {
    alignContent: 'center',
    textAlign: 'center',
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
    margin: theme.spacing(2, 0, 2),
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
  cssFocused: {
    color: 'white',
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
  },
  small: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

export default function Profile() {
  const classes = useStyles();

  const user = useSelector((state) => state.authenticated);

  const [image, setImage] = useState({});

  const [userAliases, setUserAliases] = useState([]);

  const [newAliasName, setNewAliasName] = useState('');

  const [needLoadAlias, setNeedLoadAlias] = useState(true);

  const [needLoadAlias2, setNeedLoadAlias2] = useState(true);

  const [currentAliasName, setCurrentAliasName] = useState('');

  //function to set the profile image according the user being logged in
  const getProfileImage = (userId) => {
    let profileImage;
    switch (userId) {
      case 1:
        profileImage = hammad;
        break;
      case 2:
        profileImage = stephen;
        break;
      case 3:
        profileImage = heng;
        break;
      case 4:
        profileImage = tristan;
        break;
      default:
        break;
    }
    setImage(profileImage);
  };

  //function that calls another to send an Http request
  //to the backend to retrieve a list of all user aliases
  const updateUserAliases = async () => {
    let allUserAliases = await GetAllUserAliases(user.userId);
    console.log('updateUserAliases() is getting repeated');
    if (needLoadAlias2) {
      setUserAliases(allUserAliases);
      setNeedLoadAlias2(false);
    }
  };

  //function that calls another to send an Http request
  //to the backend to retrieve a the users' active alias
  const getCurrentAlias = async () => {
    let currentAlias = await GetCurrentAlias(user.userId);
    console.log('getCurrentAlias() is getting repeated');
    if (needLoadAlias) {
      setCurrentAliasName(currentAlias);
      setNeedLoadAlias(false);
    }
  };

  //this function is called by the main component to
  //render a table showing all user aliases
  const getUserAliases = () => {
    updateUserAliases();
    return (
      // <div>
      //     <UserAliasesTable />
      // </div>
      <div>
        <UserAliasesCards />
      </div>
    );
  };

  //making sure that the current user's name is displayed once the page loads
  useEffect(() => {
    getProfileImage(user.userId);
    getCurrentAlias();
  });

  //this function is called on the click of a button to
  //take the alias displayed on the row and set is as current
  const handleSetAlias = (alias) => {
    if (alias.stateID !== 1) {
      alert(
        'Cannot set a revealed alias as current alias.\nPlease choose another alias or create a new one!'
      );
      return;
    }
    UpdateAlias(user.userId, alias); //backend
    setCurrentAliasName(alias.name); //frontend
  }; //can be done with just the backend function but this makes it easier

  //sets a state called newName to user's input
  function changeHandler(event) {
    const newName = event.target.value;
    setNewAliasName(newName);
  }

  //passes the newName state to the function making the Http request to make a new alias
  function handleSubmit(event) {
    event.preventDefault();

    MakeAnAlias(user.userId, newAliasName);

    setCurrentAliasName(newAliasName);

    const newAlias = {
      aliasLevel: 0,
      name: newAliasName,
      stateID: 1,
    };
    const updatedAliases = userAliases;
    updatedAliases.push(newAlias);
    setUserAliases(updatedAliases);
  }

  const UserAliasesCards = () => {
    return (
      <div className={classes.cardsRoot}>
        <Grid
          container
          spacing={1}
          gridGap={0}
          style={{ width: '42%', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {userAliases.map((alias) => (
            <Grid item xs={4} height={20}>
              <Card
                className={classes.card}
                style={{
                  backgroundColor: '#EEEEEE',
                  border: '3px solid #777777',
                  borderRadius: '5px',
                }}
              >
                <CardContent style={{ alignItems: 'center' }}>
                  <Avatar alt="Alias" src={alias1} className={classes.small} />
                  <br />
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    style={{ textAlign: 'center' }}
                  >
                    {alias.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <b>Level:</b> {alias.aliasLevel}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <b>Status:</b> {alias.stateID === 1 ? 'Hidden' : 'Revealed'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    onClick={() => handleSetAlias(alias)}
                  >
                    Take Alias
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar alt="Hammad" src={image} className={classes.large} />
          <br />
          <Typography component="h1" variant="h4">
            {user.firstName} {user.lastName}
          </Typography>
          <br />
          <br />
          <div
            style={{
              border: '1px solid white',
              width: '100%',
              borderRadius: '7px',
              padding: '10px',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
            <h5 style={{ marginTop: '5px', marginBottom: '5px' }}>User ID:</h5>
            <p style={{ marginTop: '5px', marginBottom: '5px' }}>
              {user.userId}
            </p>
          </div>
          <div
            style={{
              border: '1px solid white',
              width: '100%',
              borderRadius: '7px',
              padding: '10px',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
            <h5 style={{ marginTop: '5px', marginBottom: '5px' }}>Email:</h5>
            <p style={{ marginTop: '5px', marginBottom: '5px' }}>
              {user.email}
            </p>
          </div>
          <div
            style={{
              border: '1px solid white',
              width: '100%',
              borderRadius: '7px',
              padding: '10px',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
            <h5 style={{ marginTop: '5px', marginBottom: '5px' }}>Username:</h5>
            <p style={{ marginTop: '5px', marginBottom: '5px' }}>
              {user.userName}
            </p>
          </div>
          <div
            style={{
              border: '1px solid white',
              width: '100%',
              borderRadius: '7px',
              padding: '10px',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
            <h5 style={{ marginTop: '5px', marginBottom: '5px' }}>
              Current Location:
            </h5>
            <p style={{ marginTop: '5px', marginBottom: '5px' }}>
              {user.currentLocation.locationName}
            </p>
          </div>
          <br />
          <div>
            <Link to="/profile/edit">Edit Profile</Link>
            <Route path="/profile/edit" exact component={EditProfile} />
          </div>

          {/* <BrowserRouter>
                        <Route path="/profile/edit" exact component={EditProfile} />
                        <Link to="/profile/edit">Edit Profile</Link>
                    </BrowserRouter> */}
          <br />
          <div>
            <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
              Your Aliases
            </h2>
            <div
              style={{
                border: '1px solid white',
                width: '20%',
                borderRadius: '7px',
                padding: '10px',
                marginTop: '10px',
                marginBottom: '20px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <h5 style={{ marginTop: '5px', marginBottom: '5px' }}>
                Current Alias:
              </h5>
              <p style={{ marginTop: '5px', marginBottom: '5px' }}>
                {currentAliasName}
              </p>
            </div>
            {getUserAliases()}
          </div>
          <br />

          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
            style={{ marginTop: '50px' }}
          >
            <h3>Create New Alias</h3>
            <TextField
              placeholder="Alias Name"
              style={{ marginTop: '0px' }}
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
              variant="outlined"
              color="secondary"
              style={{ width: '25%', marginLeft: 'auto', marginRight: 'auto' }}
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
