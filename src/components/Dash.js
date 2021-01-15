import React from 'react';
import { useDispatch } from 'react-redux';

import { auth } from '../actions';

export default function SignIn() {
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
