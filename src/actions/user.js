import { CHANGE_LOCATION, CHANGE_AUTH } from './types';
import { baseClient } from '../utils/remote';

export const updateLocation = (data) => async (dispatch) => {
  try {
    const response = await baseClient.put('/players', data);

    if (response.status === 200) {
      const user = response.data;
      //delete user.password;
      dispatch({ type: CHANGE_LOCATION, payload: user });
    }
  } catch (e) {}
};

export const updateUser = (flag, data) => async (dispatch) => {
  try {
    const response = await baseClient.put(`/players/${flag}`, data);

    if (response.status === 200) {
      const user = response.data;
      delete user.password;
      dispatch({ type: CHANGE_AUTH, payload: user });
    }
  } catch (e) {}
};
