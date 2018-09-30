import React, { Component } from "react";
import Avatar from "avataaars";
import "./Profile.css";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import { CardMedia, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  card: {
    maxWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null
    };
  }

  componentWillMount() {
    this.setState({ avatar: this.renderAvatar() });
  }

  renderAvatar = () => {
    if (this.props.authData.avatar) {
      return (
        <img
          className="avatar"
          alt="Avatar"
          src={this.props.authData.avatar.uri}
        />
      );
    } else {
      return (
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
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ padding: "20px" }} className="container-fluid">
        <Card className={classes.card}>
          <CardContent>
            <center>{this.state.avatar}</center>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.authData.name}
            </Typography>
            <Typography component="p">
              {this.props.authData.phone}
              <br />
              {this.props.authData.country}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Profile);
