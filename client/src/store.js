/* 

createStore() creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.
Middleware is the suggested way to extend Redux with custom functionality. Middleware lets you wrap the store's dispatch method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.

The most common use case for middleware is to support asynchronous actions without much boilerplate code or a dependency on a library like Rx. It does so by letting you dispatch async actions in addition to normal actions.

For example, redux-thunk lets the action creators invert control by dispatching functions. They would receive dispatch as an argument and may call it asynchronously. Such functions are called thunks. Another example of middleware is redux-promise. It lets you dispatch a Promise async action, and dispatches a normal action when the Promise resolves.

*/

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// createStore(reducer, [preloadedState], [enhancer])
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // Comment below if running without redux devtools extension
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;