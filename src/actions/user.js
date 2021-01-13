import { CHANGE_LOCATION } from './types';
import { baseClient } from '../utils/remote';

export const updateLocation = ({data}) => async (dispatch) => {
  try {
    const data2 = {
      "userId": 2,
      "firstName": "Stephen",
      "lastName": "Razis",
      "userName": "sizaris",
      "userPassword": "pDKa2HlaxboTHj19DOV9lRUx0znidBV2oqj31huFpkI=",
      "email": "stephen.razis@revature.net",
      "photo": null,
      "salt": "ytDVaSqyrsSMmK435VzPY6Vnq",
      "currentLocationId": 3,
      "movementCooldown": "2021-01-13T13:32:14.580+00:00"
    }

    const response = await baseClient.put('/players/false', data2);

    console.log(response);

    if (response.status === 200) {
      const user = response.data;
      delete user.password;
      dispatch({ type: CHANGE_LOCATION, payload: user });
    }
  } catch (e) {
    
  }
};