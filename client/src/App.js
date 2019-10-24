import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Provider which provides application level state to components
import { Provider } from 'react-redux';
// Storage for application level state
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
