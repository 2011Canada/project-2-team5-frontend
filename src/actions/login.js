import { CHANGE_AUTH, FETCH_ERROR_MESSAGE } from './types';
import { baseClient } from '../utils/remote';
export const login = (data) => async (dispatch) => {
  try {
    const response = await baseClient.post('/login', data);

    if (response.status === 200) {
      const user = response.data;
      delete user.password;
      dispatch({ type: CHANGE_AUTH, payload: user });
      dispatch({ type: FETCH_ERROR_MESSAGE, payload: '' });
    }
  } catch (e) {
    dispatch({
      type: FETCH_ERROR_MESSAGE,
      payload: 'Wrong user name or password',
    });
  }
};

export const logout = (data) => async (dispatch) => {
  dispatch({ type: CHANGE_AUTH, payload: false });
};
