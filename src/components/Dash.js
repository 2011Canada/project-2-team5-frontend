import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import { auth } from '../actions';

export default function SignIn() {
  const user = useSelector((state) => state.authenticated);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(auth.logout('2222'));
        }}
      >
        Logout
      </button>
      Dash
    </div>
  );
}
