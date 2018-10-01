import React, { Component } from "react";
import { browserHistory } from "react-router";
import INKVideo from "../../components/INKVideo";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { SnackbarContent } from "@material-ui/core";

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
      hash: null
    };
  }
  componentWillMount = () => {
    const { classes } = this.props;
    var currentLocation = browserHistory.getCurrentLocation();
    if ("hash" in currentLocation.query) {
      this.setState({ hash: currentLocation.query.hash });
    }
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
