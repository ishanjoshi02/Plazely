import React, { Component } from "react";
import Avatar from "avataaars";
import "./Profile.css";
import Card from "@material-ui/core/Card";
import CardActionArea, { CardMedia, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class Profile extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  renderAvatar = () => {
    if (this.props.authData.avatar) {
      return (
        <center>
          <img
            className="avatar"
            alt="Avatar"
            src={this.props.authData.avatar.uri}
          />
        </center>
      );
    } else {
      return (
        <center>
          <Avatar
            style={{ width: "200px", height: "200px" }}
            avatarStyle="Circle"
            topType="ShortHairShortCurly"
            accessoriesType="Prescription02"
            hairColor="BrownDark"
            facialHairType="BeardLight"
            facialHairColor="BrownDark"
            clotheType="BlazerSweater"
            eyeType="Default"
            eyebrowType="Default"
            mouthType="Smile"
            skinColor="Light"
          />
        </center>
      );
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <Card>
          <CardActionArea>
            <CardMedia>{this.renderAvatar}</CardMedia>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {this.props.authData.name}
              </Typography>
              <Typography component="p">
                {this.props.authData.phone}
                <br />
                {this.props.authData.country}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="container-fluid">
  //       <div className="card" style={{ maxWidth: "20rem" }}>
  //         <h3 className="card-header">
  //           <center>Profile</center>
  //         </h3>
  //         <div className="card-body" style={{ padding: 25 }}>
  //           <h5 className="card-title">
  //             <center>{this.props.authData.name}</center>
  //           </h5>
  //           <br />
  //           {this.renderAvatar()}
  //           <br />
  //           <ul className="list-group list-group-flush">
  //             <li className="list-group-item">
  //               <strong>Phone</strong> &nbsp;
  //               {this.props.authData.phone}
  //             </li>
  //             <li className="list-group-item">
  //               <strong>Country</strong> &nbsp;
  //               {this.props.authData.country}
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

export default Profile;
