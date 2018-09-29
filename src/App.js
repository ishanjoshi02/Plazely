import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

// // Styles
import "./css/oswald.css";
import "./App.css";

import { Link } from "react-router";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "./util/wrappers.js";

// UI Components
import LoginButtonContainer from "./user/ui/loginbutton/LoginButtonContainer";
import LogoutButtonContainer from "./user/ui/logoutbutton/LogoutButtonContainer";
import { ListItem } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  setDrawerState = open => () => {
    this.setState({
      drawerOpen: open
    });
  };

  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() => (
      <Drawer open={this.state.drawerOpen} onClose={this.setDrawerState(false)}>
        <div
          tabIndex={0}
          className={classes.list}
          role="button"
          onClick={this.setDrawerState(false)}
          onKeyDown={this.setDrawerState(false)}
        >
          <List>
            <ListItem>
              <Button>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </ListItem>
            <ListItem>
              <Button>
                <Link to="/profile">Profile</Link>
              </Button>
            </ListItem>
            <ListItem>
              <Button>
                <Link to="/uploadVideo">Upload Video</Link>
              </Button>
            </ListItem>
          </List>
        </div>
      </Drawer>
    ));

    const LogoutButton = VisibleOnlyAuth(() => <LogoutButtonContainer />);

    const OnlyGuestLinks = HiddenOnlyAuth(() => <LoginButtonContainer />);
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.setDrawerState(true)}
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Project INK
            </Typography>

            <OnlyGuestLinks />
            <LogoutButton />
          </Toolbar>
        </AppBar>
        <OnlyAuthLinks />
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
