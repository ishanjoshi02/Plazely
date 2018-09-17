import React, { Component } from "react";
import INKVideo from "../../components/INKVideo";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "../../util/wrappers";
import { createNode } from "ipfs";
import "./Home.css";
class Home extends Component {
  state = {
    guestHash:
      "https://ipfs.io/ipfs/QmTKZgRNwDNZwHtJSjCp6r5FYefzpULfy37JvMt9DwvXse/video.mp4"
  };

  getUri = hash => {
    return "https://ipfs.io/ipfs/" + hash;
  };

  render() {
    const node = createNode();
    node.on("ready", () => {
      console.log("Node " + JSON.stringify(node));
    });

    // const VideoPlayer = this.state.hashes.map(hash => (
    //   // let ipfsURI =
    //   <div key={hash}>
    //     <INKVideo src={this.getUri(hash)} />
    //     <br />
    //   </div>
    // ));

    const AuthVideoPlayer = VisibleOnlyAuth(() => (
      <div className="video-grid">
        <INKVideo src="https://ipfs.io/ipfs/QmYqcJJip5cyYuaSgCGUEBEaq2fxMA46B7nhkb5Ay4oh2E" />
        <INKVideo src="https://ipfs.io/ipfs/QmReCgkcuh2ETJPqjiSV5NKiUf11Pg3tcb12hqm4h8zHo4" />
        <INKVideo src="https://ipfs.io/ipfs/QmSsmiN8rycAi8dcx9FymV35pUJX3vgtaMy6VoPVe47BtY" />
      </div>
    ));

    const GuestVideoPlayer = HiddenOnlyAuth(() => (
      <div className="card mb-6">
        <h3 className="card-header">Sample Video Streaming using IPFS</h3>
        <center>
          <INKVideo src={this.state.guestHash} />
        </center>
        <div className="card-body">
          <p className="card-text">Add project description</p>
        </div>
      </div>
    ));

    return (
      <main className="container">
        <div className="pure-g">
          {/* <div className="pure-u-1-1"> */}
          <AuthVideoPlayer />
          <GuestVideoPlayer />
        </div>
        {/* </div> */}
      </main>
    );
  }
}

export default Home;
