import React, { Component } from "react";
// import { Image, Card } from "semantic-ui-react";

class Profile extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
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
            <center>
              <img
                style={{
                  height: "200px",
                  display: "block",
                  borderRadius: "50%",
                  width: "200px"
                }}
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
      </main>
    );

    // return (
    //   <main className="container">
    //     <div className="pure-g">
    //       <Card className="pure-u-1-1">
    //         <h1>Profile</h1>
    //         {/* <img src={AvatarURI} alt={this.props.authData.name} /> */}
    //         <Image src={avatarURI} size="small" wrapped />
    //         <p>
    //           <strong>Name</strong>
    //           <br />
    //           {this.props.authData.name}
    //         </p>
    //         <p>
    //           <strong>Email</strong>
    //           <br />
    //           {this.props.authData.email}
    //         </p>
    //         <p>
    //           <strong>Phone</strong>
    //           <br />
    //           {this.props.authData.phone}
    //         </p>
    //         <p>
    //           <strong>Country</strong>
    //           <br />
    //           {this.props.authData.country}
    //         </p>
    //       </Card>
    //     </div>
    //   </main>
    // );
  }
}

export default Profile;
