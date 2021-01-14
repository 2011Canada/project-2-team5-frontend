import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { auth } from '../actions';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth.logout());
  });

  return <></>;
};

export default Logout;
