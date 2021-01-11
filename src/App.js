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
import LocationDrawer from './components/LocationDrawer';
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

  let testLocation = {
    id: 0,
    locationName: 'Paris',
    description: 'This is a test description of Paris',
    adjacent: [
      { id: 0, name: 'London' },
      { id: 1, name: 'Berlin' },
    ],
    image: paris_photo,
  };

  let testLocation2 = {
    id: 1,
    locationName: 'Berlin',
    description: 'This is a test description of Berlin',
    adjacent: [
      { id: 2, name: 'Paris' },
      { id: 3, name: 'Rome' },
    ],
    image: {},
  };

  //TODO
  let setLocation = () => {};

  return (
    // <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Header />
      <Route path="/signup" exact component={Signup} />
      <Route path="/dashboard" exact component={requireAuth(Dash)} />
      <Route path = "/profile" exact component={Profile} />
      <Route path="/map" exact component={Map} />
      <Route path="/locationTester">
        <LocationDrawer location={testLocation} setLocation={setLocation} />
        <LocationDrawer location={testLocation2} setLocation={setLocation} />
      </Route>
      {/* <Route
            path="/dashboard"
            exact
            component={requireAuth(myLayout(DashBoard, 'Dash Board', 1))}
          /> */}

      <Link to="/locationTester">Location Tester</Link>
      <br />
      <Link to="/">Home</Link>
    </BrowserRouter>
    // </ThemeProvider>
  );
};

export default App;
