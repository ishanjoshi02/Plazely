import React, { Component } from "react";
// import { Image, Card } from "semantic-ui-react";
import "./Profile.css";

class Profile extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  render() {
    return (
      <div className="card container-fluid">
        <h3 className="card-header">
          <center>Profile</center>
        </h3>
        <div className="card-body" style={{ padding: 25 }}>
          <h5 className="card-title">
            <center>{this.props.authData.name}</center>
          </h5>
          <br />
          <center>
            <img
              className="avatar"
              alt="Your avatar"
              src={this.props.authData.avatar.uri}
            />
          </center>
          <br />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Phone</strong> &nbsp;
              {this.props.authData.phone}
            </li>
            <li className="list-group-item">
              <strong>Country</strong> &nbsp;
              {this.props.authData.country}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;
