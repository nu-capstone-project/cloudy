import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Provider which provides application level state to components
import { Provider } from 'react-redux';
// Storage for application level state
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


let checkToken = () => {
  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    console.log('checkToken()');
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = './login';
    }
  }  
}

function App() {
  checkToken();
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar />
          <Route exact path='/' component={Landing}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
