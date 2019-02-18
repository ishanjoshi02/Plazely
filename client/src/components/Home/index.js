import React from "react";
import Profile from "../Profile/index";

class Home extends React.Component {
  state = {
    name: "Neeraj"
  };

  render() {
    return (
      <div>
        <Profile name={this.state.name} />
      </div>
    );
  }
}

export default Home;
