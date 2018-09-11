import React, { Component } from "react";

class INKVideo extends Component {
  // state = {  }

  constructor(props) {
    super(props);
    this.state = {
      // playing: false,
      // buttonName: "Play",
      source: this.props.src
    };
  }

  // playPause = () => {
  //   if (this.state.playing) {
  //     this.setState({
  //       playing: true,
  //       buttonName: "Pause"
  //     });
  //   } else {
  //     this.setState({
  //       playing: false,
  //       buttonName: "Play"
  //     });
  //   }
  // };

  render() {
    return (
      <div>
        <video controls="true" width="1000" height="600">
          <source src={this.state.source} />
        </video>
        {/* <button /> */}
      </div>
    );
  }
}

export default INKVideo;
