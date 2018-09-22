import React, { Component } from "react";
import { browserHistory } from "react-router";
import INKVideo from "../../components/INKVideo";

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: null
    };
  }
  render() {
    var currentLocation = browserHistory.getCurrentLocation();
    if ("hash" in currentLocation.query) {
      this.setState({ hash: currentLocation.query.hash });
    }
    return <INKVideo src={"https://ipfs.io/ipfs/" + this.state.hash} />;
  }
}

export default WatchVideo;
