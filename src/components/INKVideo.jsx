import React, { Component } from "react";

class INKVideo extends Component {
  state = {};

  render() {
    return (
      <div>
        <video controls="true" width="80%" height="50%">
          <source src={this.props.src} />
        </video>
        {/* <button /> */}
      </div>
    );
  }
}

export default INKVideo;
