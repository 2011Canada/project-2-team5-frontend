/* eslint-disable import/no-anonymous-default-export */
import { CHANGE_AUTH } from '../actions/types';
export default function (state = false, action) {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload;

    default:
      return state;
  }
}
