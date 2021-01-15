/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import requireAuth from './components/require_auth';

import Map from './components/Map/Map';
import Login from './components/Login';
import Signup from './components/Signup';

import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Contract from './components/Contract';

import Header from './components/Header';
import Logout from './components/Logout';

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
      <Route path="/map" exact component={requireAuth(Map)} />

      <Route path="/profile" exact component={requireAuth(Profile)} />
      <Route path="/profile/edit" exact component={requireAuth(EditProfile)} />
      <Route path="/contract" exact component={requireAuth(Contract)} />

      <Route path="/logout" exact component={requireAuth(Logout)} />
    </BrowserRouter>
    // </ThemeProvider>
  );
};

export default App;
