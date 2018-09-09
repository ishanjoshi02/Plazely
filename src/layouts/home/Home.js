import React, { Component } from "react";
import INKVideo from "../../components/INKVideo";

class Home extends Component {
  state = {
    hashes: [
      "QmSsmiN8rycAi8dcx9FymV35pUJX3vgtaMy6VoPVe47BtY",
      "QmVjdpDSkBn13CwUWtb475WVYfUQNzMzwBe8wrpaPdKUSs"
      // add more ipfs hashes
    ]
  };

  getUri = hash => {
    return "https://ipfs.io/ipfs/" + hash;
  };

  render() {
    const VideoPlayer = this.state.hashes.map(hash => (
      // let ipfsURI =
      <div>
        <INKVideo src={this.getUri(hash)} />
        <br />
      </div>
    ));

    console.log(VideoPlayer);

    return (
      <main className="container">
        <div className="pure-g">
          {/* <div className="pure-u-1-1">{VideoPlayer}</div> */}
        </div>
      </main>
    );
  }
}

export default Home;
