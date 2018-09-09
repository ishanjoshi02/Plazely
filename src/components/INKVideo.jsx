import React, { Component } from "react";

class INKVideo extends Component {
  // state = {  }

  constructor(props) {
    super(props);
    this.state = {
      source: this.props.src
    };
  }

  render() {
    return (
      <video>
        <source src={this.state.source} />
      </video>
    );
  }
}

export default INKVideo;
