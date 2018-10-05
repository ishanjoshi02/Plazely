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
const BigchainDB = require("bigchaindb-driver");

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
      hash: "QmTKZgRNwDNZwHtJSjCp6r5FYefzpULfy37JvMt9DwvXse/video.mp4",
      uuid: null
    };
  }
  componentWillMount = async () => {
    const { classes } = this.props;
    var currentLocation = browserHistory.getCurrentLocation();
    if ("uuid" in currentLocation.query) {
      console.log(currentLocation.query.uuid);
      await this.setState({ uuid: currentLocation.query.uuid });
      const conn = new BigchainDB.Connection(API_PATH, {
        app_id: applicationID,
        app_key: applicationKey
      });
      conn.searchAssets(this.state.uuid).then(assets => {
        console.log(assets[0]["data"]["assets"]["videoHashes"]["720p"]);
        this.setState({
          hash: assets[0]["data"]["assets"]["videoHashes"]["720p"]
        });
      });
    }
  };
  render() {
    return (
      <div className="container-fluid" style={{ paddingTop: "5%" }}>
        <video
          src={"https://ipfs.io/ipfs/" + this.state.hash}
          autoPlay
          controls
        />
      </div>
    );
  }
}

WatchVideo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(WatchVideo);
