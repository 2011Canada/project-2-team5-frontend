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

import Header from './components/Header';

import paris_photo from './location_photos/paris.jpg';
import LocationDrawer from './components/Map/LocationDrawer';
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
      <Route path="/map" exact component={Map} />
      <Route path="/locationTester">
        <LocationDrawer locationId={1} />
        <LocationDrawer locationId={2} />
        <LocationDrawer locationId={3} />
        <LocationDrawer locationId={4} />
        <LocationDrawer locationId={5} />
        <LocationDrawer locationId={6} />
        <LocationDrawer locationId={7} />
      </Route>
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
