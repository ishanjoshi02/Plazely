import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth } from "../../actions";

import "./styles.css";

class AuthButton extends Component {
  state = { isAuth: false };
  componentWillMount() {
    this.props.dispatch(auth());
  }
  componentWillReceiveProps(nextProps) {
    const { isAuth } = nextProps.user.login;
    this.setState({ isAuth });
  }
  logoutUser() {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  renderButton() {
    let button = null;
    if (this.state.isAuth) {
      button = (
        <a className="nav-item" href="/login">
          <div
            onClick={() => {
              this.logoutUser();
            }}
          >
            Logout
          </div>
        </a>
      );
    } else {
      button = (
        <a
          style={{ color: "#fff", textDecoration: "none" }}
          className="nav-item"
          href="/login"
        >
          Login
        </a>
      );
    }
    return button;
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <ul className="navbar-nav mr-auto">{this.renderButton()}</ul>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(AuthButton);
