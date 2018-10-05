import React, { Component } from "react";
import { browserHistory } from "react-router";
import INKVideo from "../../components/INKVideo";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { SnackbarContent } from "@material-ui/core";
import driver from "bigchaindb-driver";

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
      uuid: null
    };
  }
  componentWillMount = () => {
    const { classes } = this.props;
    var currentLocation = browserHistory.getCurrentLocation();
    if ("uuid" in currentLocation.query) {
      this.setState({ uuid: currentLocation.query.uuid });
    }

    const conn = new driver.Connection();

    conn.searchAssets(this.state.uuid).then(assets => {
      this.setState({ hash: assets[0]["data"]["720p"] });
    });
  };
  render() {
    return (
      <div className="container-fluid" style={{ paddingTop: "5%" }}>
        <INKVideo src={"https://ipfs.io/ipfs/" + this.state.hash} />
      </div>
    );
  }
}

WatchVideo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(WatchVideo);
