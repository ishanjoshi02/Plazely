import React, { Component } from "react";
// import { Image, Card } from "semantic-ui-react";
import "./Profile.css";

class Profile extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  renderAvatar = () => {
    if (this.props.authData.avatar) {
      return (
        <center>
          <img className="avatar" alt={} src={this.props.authData.avatar.uri} />
        </center>
      )
    }
  }

  render() {
    return (
      <main className="container">
        <div className="card" style={{ maxWidth: "20rem" }}>
          <h3 className="card-header">
            <center>Profile</center>
          </h3>
          <div className="card-body" style={{ padding: 25 }}>
            <h5 className="card-title">
              <center>{this.props.authData.name}</center>
            </h5>
            <br />
              {this.renderAvatar()}
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
      </main>
    );
  }
}

export default Profile;
