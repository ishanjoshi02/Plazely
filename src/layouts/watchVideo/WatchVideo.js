import React, { Component } from "react";
import { browserHistory } from "react-router";
import {
  applicationID,
  applicationKey,
  API_PATH
} from "../../keys/bigchaindbKey";
import INKVideo from "../../components/INKVideo";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import Orm from "bigchaindb-orm";
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
      description: "",
      category: "",
      uuid: null
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
          hash: assets[0]["data"]["videoHashes"]["720p"]
        });
        this.setState({
          name: assets[0]["data"]["title"]
        });
        this.setState({
          description: assets[0]["data"]["description"]
        });
        this.setState({ category: assets[0]["data"]["category"] });
      });
    }
    if ("hash" in currentLocation.query) {
      await this.setState({ hash: currentLocation.query.hash });
    }
  };
  render() {
    return (
      <div className="container-fluid" style={{ paddingTop: "5%" }}>
        <Card style={{ width: "70%" }}>
          <CardMedia
            src={"https://ipfs.io/ipfs/" + this.state.hash}
            component="video"
            controls
          />
          <CardContent>
            {" "}
            <Typography gutterBottom variant="headline" component="h2">
              {this.state.name}
            </Typography>
            <Typography component="p">{this.state.description}</Typography>
            <Typography component="p">{this.state.category}</Typography>
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
