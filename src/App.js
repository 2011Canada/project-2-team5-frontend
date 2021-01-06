/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// import requireAuth from './components/require_auth';
// import myLayout from './components/MyTemplate';

import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      {/* <Route
            path="/dashboard"
            exact
            component={requireAuth(myLayout(DashBoard, 'Dash Board', 1))}
          /> */}
    </BrowserRouter>
  );
};

export default App;
