import React, { Component } from "react";
import { connect } from "react-redux";

import { signup } from "../../actions";

class SignUp extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    error: ""
  };
  onChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "firstname": {
        this.setState({ firstname: value });
        break;
      }
      case "lastname": {
        this.setState({ lastname: value });
        break;
      }
      case "username": {
        this.setState({ username: value });
        break;
      }
      case "email": {
        this.setState({ email: value });
        break;
      }
      case "password": {
        this.setState({ password: value });
        break;
      }
      default: {
        break;
      }
    }
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.dispatch(signup(this.state));
  };
  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
    if (nextProps.user.login.isAuth) {
      this.props.history.push("/");
    } else {
      console.log(nextProps);
      this.setState({ error: nextProps.user.login.error.reason });
    }
  };
  renderError() {
    if (this.state.error) {
      return (
        <div
          style={{
            marginTop: `10px`
          }}
          className="alert alert-dismissible alert-danger"
        >
          {this.state.error}
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Sign Up Form</legend>
            <div className="form-group ">
              <input
                id="firstName"
                type="text"
                className="form-control"
                value={this.state.firstname}
                placeholder="Enter your First Name"
                name="firstname"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={this.state.lastname}
                placeholder="Enter your Last Name"
                name="lastname"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={this.state.username}
                placeholder="Enter your Username"
                name="username"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                placeholder="Enter your Email"
                name="email"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                placeholder="Enter your Password"
                name="password"
                onChange={this.onChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Signup
            </button>
            <br />
            {this.renderError()}
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(SignUp);
