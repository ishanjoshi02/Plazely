import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };
  onChange = e => {
    const { name, value } = e.target;
    switch (name) {
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
    this.props.dispatch(login(this.state));
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.user.login.error) {
      this.setState({ error: nextProps.user.login.error.reason });
    } else {
      this.props.history.push("/");
    }
  };
  renderError() {
    if (this.state.error) {
      return (
        <div
          style={{
            marginTop: `10px`
          }}
          className="alert alert-disimmissable alert-danger"
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
            <legend>Log In Form</legend>
            <div className="form-group ">
              <input
                id="email"
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
              Sign up
            </button>
            {this.renderError()}
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Login);
