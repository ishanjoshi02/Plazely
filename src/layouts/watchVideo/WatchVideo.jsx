import React, { Component } from "react";
import { browserHistory } from "react-router";
import {
  applicationID,
  applicationKey,
  API_PATH
} from "../../keys/bigchaindbKey";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import Orm from "bigchaindb-orm";
import { VisibleOnlyAuth } from "../../util/wrappers";
const driver = require("bigchaindb-driver");

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
    paddingBottom: 5
  }
});

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: null,
      name: "",
      author: "",
      description: "",
      category: "",
      uuid: null,
      isPlaying: true
    };
  }
  componentDidMount = async () => {
    const { classes } = this.props;
    var currentLocation = browserHistory.getCurrentLocation();
    if ("uuid" in currentLocation.query) {
      await this.setState({ uuid: currentLocation.query.uuid });
      const bdbOrm = new Orm(API_PATH, {
        app_id: applicationID,
        app_key: applicationKey
      });
      bdbOrm.define("Movie", "https://schema.org/v1/Movie");
      bdbOrm.models.Movie.retrieve(this.state.uuid).then(assets => {
        console.log(assets);
        this.setState({
          hash:
            "https://ipfs.io/ipfs/" + assets[0]["data"]["videoHashes"]["720p"]
        });
        this.setState({
          name: assets[0]["data"]["title"]
        });
        this.setState({
          description: assets[0]["data"]["description"]
        });
        bdbOrm.define("User", "https://schema.org/v1/User");
        bdbOrm.models.User.retrieve().then(a => {
          // console.log(assets);
          a.forEach(asset => {
            console.log(asset.data.phoneNumber.replace(" ", ""));
            const author = assets[0].data.author.replace("+", "");
            console.log(author);
            if (asset.data.phoneNumber.replace(" ", "") == author) {
              console.log(asset);
              this.setState({ author: asset.data.name });
            }
          });
        });
      });
    }

    if ("hash" in currentLocation.query) {
      await this.setState({ hash: currentLocation.query.hash });
    }
  };
  handleKeyPress = e => {
    if (e.keyCode == "SPACE") {
    }
  };
  render() {
    return (
      <div className="container-fluid" style={{ paddingTop: "5%" }}>
        <Card style={{ width: "70%" }}>
          <CardMedia
            src={this.state.hash}
            component="video"
            autoplay
            loop
            onKeyPress={this.handleKeyPress}
            controls
          />
          <CardContent>
            {" "}
            <Typography gutterBottom variant="headline" component="h2">
              {this.state.name}
            </Typography>
            <Typography component="p">{this.state.description}</Typography>
            <Typography component="p">{this.state.category}</Typography>
            <Typography component="p">{this.state.author}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

WatchVideo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(WatchVideo);
