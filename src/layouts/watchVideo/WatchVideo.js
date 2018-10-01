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
  componentWillMount = () => {
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

export default WatchVideo;
