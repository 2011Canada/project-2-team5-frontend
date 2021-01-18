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
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#303030',
      },
      secondary: {
        main: '#CCCCCC',
      },
    },
  });

  document.body.style.backgroundColor = '#303030';

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Header />
        <Route path="/signup" exact component={Signup} />
        <Route path="/map" exact component={requireAuth(Map)} />
        <Route path="/profile" exact component={requireAuth(Profile)} />
        <Route
          path="/profile/edit"
          exact
          component={requireAuth(EditProfile)}
        />
        <Route path="/contract" exact component={requireAuth(Contract)} />

        <Route path="/logout" exact component={requireAuth(Logout)} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
