/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

import requireAuth from './components/require_auth';

import Map from './components/Map/Map';
import Login from './components/Login';
import Signup from './components/Signup';
import Dash from './components/Dash';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Contract from './components/Contract';

import Header from './components/Header';
import Logout from './components/Logout';

import paris_photo from './location_photos/paris.jpg';
<<<<<<< HEAD
import LocationDrawer from './components/Map/LocationDrawer';
=======

>>>>>>> main
const App = () => {
  // const theme = createMuiTheme({
  //   palette: {
  //     primary: {
  //       // Purple and green play nicely together.
  //       main: purple[500],
  //     },
  //     secondary: {
  //       // This is green.A700 as hex.
  //       main: '#11cb5f',
  //     },
  //   },
  // });

  return (
    // <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Header />
      <Route path="/signup" exact component={Signup} />
      <Route path="/dashboard" exact component={requireAuth(Dash)} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/profile/edit" exact component={EditProfile} />
      <Route path="/myContract" exact component={Contract} />
      <Route path="/map" exact component={Map} />

      <Route path="/logout" exact component={requireAuth(Logout)} />
      <Route path="/locationTester"></Route>
      {/* <Route
            path="/dashboard"
            exact
            component={requireAuth(myLayout(DashBoard, 'Dash Board', 1))}
          /> */}
    </BrowserRouter>
    // </ThemeProvider>
  );
};

export default App;
