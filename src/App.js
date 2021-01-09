/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

import requireAuth from './components/require_auth';
import Login from './components/Login';
import Signup from './components/Signup';
import Dash from './components/Dash';

import paris_test_photo from './paris_test_photo.jpg';
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
    image: paris_test_photo
  }

  return (
    // <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/dashboard" exact component={requireAuth(Dash)} />
      <Route path="/locationTester"><LocationDrawer location={testLocation} /></Route>
      {/* <Route
            path="/dashboard"
            exact
            component={requireAuth(myLayout(DashBoard, 'Dash Board', 1))}
          /> */}

      <Link to="/locationTester">Location Tester</Link>
      <br/>
      <Link to="/">Home</Link>

    </BrowserRouter>
    // </ThemeProvider>
  );
};

export default App;
