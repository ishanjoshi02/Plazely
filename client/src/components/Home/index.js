import React from "react";

import store from "../../store";

class Home extends React.Component {
  componentWillMount() {
    console.log("state");
    console.log(store.getState());
  }
  render() {
    return <div>Home</div>;
  }
}

export default Home;
