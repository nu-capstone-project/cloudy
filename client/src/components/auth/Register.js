import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import validator from "validator";

class Register extends Component {
  constructor() {
    super();
    // Create state for Register fields
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      // console.log(nextProps.errors);
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  validateInput(id = "", value = "") {
    let errors = { ...this.state.errors };
    if ((id === "email") & !validator.isEmail(value)) {
      errors.email = "Invalid email address.";
    } else if (id === "email") {
      delete errors.email;
    }
    if ((id === "name") & validator.isEmpty(value)) {
      errors.name = "Name field is required.";
    } else if (id === "name") {
      delete errors.name;
    }
    if ((id === "password") & !validator.isLength(value, { min: 6, max: 30 })) {
      delete errors.wrongpassword;
      errors.password =
        "Password must consist of 6 to 30 alphanumeric characters.";
    } else if (id === "password") {
      if (value !== this.state.password2) {
        errors.password2 = "Passwords do not match.";
      } else {
        delete errors.password2;
      }

      delete errors.password;
    }
    if ((id === "password2") & (value !== this.state.password)) {
      errors.password2 = "Passwords do not match.";
    } else if (id === "password2") {
      delete errors.password2;
    }
    if ((id === "") & validator.isEmpty(this.state.name)) {
      errors.name = "Name field is required.";
    }
    if ((id === "") & validator.isEmpty(this.state.email)) {
      errors.email = "Email field is required.";
    }
    if ((id === "") & validator.isEmpty(this.state.password2)) {
      errors.password2 = "Confirm password field is required.";
    }
    if ((id === "") & validator.isEmpty(this.state.password)) {
      errors.password = "Password field is required.";
    }
    return errors;
  }

  // assign function body to a variable and set it in onEvent to prevent having to bind(this)
  onChange = e => {
    let errors = this.validateInput(e.target.id, e.target.value);
    this.setState({ [e.target.id]: e.target.value, errors: errors });
  };
  onSubmit = e => {
    // Prevent default submit behavior
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // trigger default arg value for validateInput
    let errors = this.validateInput();
    this.setState({
      errors: errors
    });
    errors = { ...errors, ...this.state.errors };
    if (Object.entries(errors).length === 0) {
      this.props.registerUser(newUser, this.props.history);
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='container'>
        <div style={{ marginTop: "2rem" }} className='row'>
          <div className='col s12 m8 offset-m2'>
            <Link to='/' className='btn-flat waves-effect'>
              <i className='material-icons left'>keyboard_backspace</i> Back to
              home
            </Link>
            <div className='col s12'>
              <h4>
                <b>Register</b> your account
              </h4>
              <p className='grey-text text-darken-1'>
                Already have an account? <Link to='/login'>Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id='name'
                  type='text'
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor='name'>Name</label>
                <span className='red-text'>{errors.name}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                  error={errors.email}
                  id='email'
                  type='email'
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
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor='password'>Password</label>
                <span className='red-text'>{errors.password}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id='password2'
                  type='password'
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor='password2'>Confirm Password</label>
                <span className='red-text'>{errors.password2}</span>
              </div>
              <div className='col s12' style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Since we cannot define types in our constructor, it is considered good convention to do so using the prop-types package.
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

/*
You may also notice we wrapped our Register with a withRouter(). While it is easy to redirect within a component (can simply say this.props.history.push('/dashboard') for example), we can’t do that by default within an action. To allow us to redirect within an action, we
* Used withRouter from react-router-dom, wrapping our component in our export withRouter()
* Will add a parameter to this.props.history within our call to this.props.registerUser(newUser, this.props.history) in our onSubmit event so we can easily access it within our action (step iv below)
*/

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
