import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };
  componentWillMount = () => {
    this.props.dispatch(login());
  };
  onChange = e => {
    const { name, value } = e.target;
  };
  onSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Login</legend>
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
            <p>{this.state.error}</p>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    prop: state.prop
  };
};

export default connect(mapStateToProps)(Login);
