import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import validator from 'validator';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // Client side basic input validation
  validateInput(id = '', value = '') {
    let errors = { ...this.state.errors };
    if ((id === 'email') & !validator.isEmail(value)) {
      errors.email = 'Invalid email address.';
    } else if (id === 'email') {
      delete errors.email;
    }
    if ((id === 'password') & !validator.isLength(value, { min: 6, max: 30 })) {
      delete errors.wrongpassword;
      errors.password = 'Password must consist of 6 to 30 alphanumeric characters.';
    } else if (id === 'password') {
      delete errors.password;
    }
    if ((id === '') & validator.isEmpty(this.state.email)) {
      errors.email = 'Email field is required.';
    }
    if ((id === '') & validator.isEmpty(this.state.password)) {
      errors.password = 'Password field is required.';
    }
    return errors;
  }

  onChange = e => {
    let errors = this.validateInput(e.target.id, e.target.value);
    this.setState({ [e.target.id]: e.target.value, errors: errors });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    // console.log(userData);
    // trigger default arg value for validateInput
    let errors = this.validateInput();
    this.setState({
      errors: errors
    });
    errors = { ...errors, ...this.state.errors };
    if (Object.entries(errors).length === 0) {
      this.props.loginUser(userData);
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <div className='container'>
        <div style={{ marginTop: '2rem' }} className='row'>
          <div className='col s12 m8 offset-m2'>
            <Link to='/' className='btn-flat waves-effect'>
              <i className='material-icons left'>keyboard_backspace</i> Back to home
            </Link>
            <div className='col s12'>
              <h4>
                <b>Login</b> to{' '}
                <span style={{ fontFamily: 'monospace' }} className='brand-logo black-text'>
                  <i className='material-icons'>cloud</i>
                  <span style={{ fontFamily: 'Verdana' }}> </span>CLOUDY
                </span>
              </h4>
              <p className='grey-text text-darken-1'>
                Don't have an account? <Link to='/register'>Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id='email'
                  type='email'
                  className={classnames('', {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor='email'>Email</label>
                <span className='red-text'>
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id='password'
                  type='password'
                  className={classnames('', {
                    invalid: errors.password || errors.wrongpassword
                  })}
                />
                <label htmlFor='password'>Password</label>
                <span className='red-text'>
                  {errors.password}
                  {errors.wrongpassword}
                </span>
              </div>
              <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                <button
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem'
                  }}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
