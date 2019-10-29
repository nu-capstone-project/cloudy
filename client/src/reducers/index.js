// rootReducer aka index.js in this dir can be referenced just by ./reducers
// Reducers are pure functions that specify how application state should change in response to an action.
// Reducers respond with the new state, which is passed to our store and, in turn, our UI.
// Our flow for reducers will go as follows.
// Import all our actions from our types.js file
// Define our initialState
// Define how state should change based on actions with a switch statement
// Remember that actions only describe what happened, but don't describe how the application's state changes.

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
