import React, { Component } from "react";
import { Link } from "react-router";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "./util/wrappers.js";
// import AppBar from "@material-ui/core/AppBar";
// import ToolBar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";

// UI Components
import LoginButtonContainer from "./user/ui/loginbutton/LoginButtonContainer";
import LogoutButtonContainer from "./user/ui/logoutbutton/LogoutButtonContainer";

// Styles
import "./css/oswald.css";

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() => (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <LogoutButtonContainer />
        </li>
      </ul>
    ));

    const OnlyGuestLinks = HiddenOnlyAuth(() => (
      <ul className="navbar-nav">
        <li>
          <LoginButtonContainer />
        </li>
      </ul>
    ));

    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link to="/" className="navbar-brand">
            INK
          </Link>
          <div className="collapse navbar-collapse justify-content-end">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </div>
        </nav>
        <br />
        {this.props.children}
      </div>
    );
  }
}

export default App;
