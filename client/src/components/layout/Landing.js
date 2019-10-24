import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
class Landing extends Component {
  render() {
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              <b>Cloud Storage</b> for the new{' '}
              <span style={{ fontFamily: 'monospace' }}>generation</span>
            </h4>
            <p className='flow-text grey-text text-darken-1'>
              Cloudy is a secure cloud storage platform, where you can store, share and work on all
              your files.
              <br />
              You can access them on any device, anywhere you go!
            </p>
            <br />
            <div className='col s6'>
              <Link
                to='/register'
                style={{
                  width: '140px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px'
                }}
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                Register
              </Link>
            </div>
            <div className='col s6'>
              <Link
                to='/login'
                style={{
                  width: '140px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px'
                }}
                className='btn btn-large waves-effect hoverable white black-text'>
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
