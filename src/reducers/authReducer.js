/* eslint-disable import/no-anonymous-default-export */
import { CHANGE_AUTH, CHANGE_LOCATION } from '../actions/types';
export default function (state = false, action) {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload;
    case CHANGE_LOCATION:
      return action.payload;
    default:
      return state;
  }
}
