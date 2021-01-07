/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ERROR_MESSAGE } from '../actions/types';
export default function (state = '', action) {
  switch (action.type) {
    case FETCH_ERROR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}
