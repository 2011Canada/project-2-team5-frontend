import { CHANGE_LOCATION } from './types';
import { baseClient } from '../utils/remote';

export const updateLocation = (data) => async (dispatch) => {
  try {
    const response = await baseClient.put('/players/false', data);
    
    if (response.status === 200) {
      const user = response.data;
      delete user.password;
      dispatch({ type: CHANGE_LOCATION, payload: user });
    }
  } catch (e) {
    
  }
};