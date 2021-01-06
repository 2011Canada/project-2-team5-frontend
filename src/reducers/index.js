import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorMessageReducer from './errorMessageReducer';

export default combineReducers({
  authenticated: authReducer,
  errorMessage: errorMessageReducer,
});
