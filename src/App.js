/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

// import requireAuth from './components/require_auth';
// import myLayout from './components/MyTemplate';

import Login from './components/Login';

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
