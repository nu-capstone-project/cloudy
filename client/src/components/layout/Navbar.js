import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div className='navbar-fixed'>
        <nav className='z-depth-0'>
          <div className='nav-wrapper white'>
            <Link
              to='/'
              style={{ fontFamily: "monospace" }}
              className='brand-logo center waves-effect black-text'>
              <i className='material-icons'>cloud</i>
              CLOUDY
            </Link>

            <div className='right'>
              <div className='container'>
                <button
                  className='hide-on-large-only btn-flat waves-effect'
                  onClick={this.onLogoutClick}
                  style={{
                    verticalAlign: "top",
                    paddingBottom: 50,
                    ...(this.props.auth.isAuthenticated
                      ? {}
                      : { display: "none" })
                  }}>
                  <i className='material-icons'>logout</i>
                </button>
                <button
                  style={{
                    width: "110px",
                    borderRadius: "3px",
                    letterSpacing: "1.2px",
                    marginTop: "0.5rem",
                    ...(this.props.auth.isAuthenticated
                      ? {}
                      : { display: "none" })
                  }}
                  onClick={this.onLogoutClick}
                  className='right btn waves-effect hide-on-med-and-down waves-light hoverable blue accent-3'>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  logoutUser: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
