import React, { Component } from "react";
// import { Image, Card } from "semantic-ui-react";

class Profile extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  render() {
    const avatarURI = this.props.authData.avatar.uri;
    // console.log(AvatarURI);

    return (
      <main className="container">
        <div className="pure-g">
          {/* <Card className="pure-u-1-1"> */}
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            {/* <img src={AvatarURI} alt={this.props.authData.name} /> */}
            <Image src={avatarURI} size="small" wrapped />
            <p>
              <strong>Name</strong>
              <br />
              {this.props.authData.name}
            </p>
            <p>
              <strong>Email</strong>
              <br />
              {this.props.authData.email}
            </p>
            <p>
              <strong>Phone</strong>
              <br />
              {this.props.authData.phone}
            </p>
            <p>
              <strong>Country</strong>
              <br />
              {this.props.authData.country}
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export default Profile;
