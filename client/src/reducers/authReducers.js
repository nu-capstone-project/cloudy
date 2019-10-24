// Reducers are pure functions that specify how application state should change in response to an action.
// Reducers respond with the new state, which is passed to our store and, in turn, our UI.
// Our flow for reducers will go as follows.
// Import all our actions from our types.js file
// Define our initialState
// Define how state should change based on actions with a switch statement
// Remember that actions only describe what happened, but don't describe how the application's state changes.

// Import types of actions
import { SET_CURRENT_USER, USER_LOADING } from '../actions/types';

const isEmpty = require('is-empty');
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

// on occurence of action, do...
export default function(state = initialState, action) {
  switch (action.type) {
    // Object.assign({}, state, {visibilityFilter: action.filter}) == {...state, visibilityFilter: action.filter }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
