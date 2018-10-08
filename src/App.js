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
import { browserHistory } from "react-router";
import Drawer from "@material-ui/core/Drawer";
import classNames from "classnames";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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
import { Image } from "semantic-ui-react";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: window.innerHeight,
    zIndex: 1,
    overflow: "auto",
    paddingBottom: "5%",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginBottom: "20px"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

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
    const { classes, theme } = this.props;
    const OnlyAuthLinks = VisibleOnlyAuth(() => (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !this.state.drawerOpen && classes.drawerPaperClose
          )
        }}
        open={this.state.drawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.setDrawerState(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List>
          {" "}
          <ListItem
            button
            onClick={() => {
              browserHistory.push("/dashboard");
            }}
          >
            <ListItemIcon>
              <i className="material-icons">dashboard</i>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              browserHistory.push("/profile");
            }}
          >
            <ListItemIcon>
              <i className="material-icons">account_circle</i>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>{" "}
          <ListItem
            button
            onClick={() => {
              browserHistory.push("/uploadVideo");
            }}
          >
            <ListItemIcon>
              <i className="material-icons">cloud_upload</i>
            </ListItemIcon>
            <ListItemText primary="Upload Video" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              browserHistory.push("/watchVideo");
            }}
          >
            <ListItemIcon>
              <i className="material-icons">movie</i>
            </ListItemIcon>
            <ListItemText primary="Upload Video" />
          </ListItem>
        </List>
      </Drawer>
    ));
    const LogoutButton = VisibleOnlyAuth(() => <LogoutButtonContainer />);
    const OnlyGuestLinks = HiddenOnlyAuth(() => <LoginButtonContainer />);
    return (
      <div className={classes.root}>
        <AppBar
          className={classNames(
            classes.appBar,
            this.state.drawerOpen && classes.appBarShift
          )}
          position="absolute"
        >
          <Toolbar disableGutters={!this.state.drawerOpen}>
            <IconButton
              className={classNames(
                "App",
                classes.menuButton,
                this.state.drawerOpen && classes.hide
              )}
              color="inherit"
              onClick={this.setDrawerState(true)}
              aria-label="Open Drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              noWrap
              className={classes.grow}
              onClick={() => {
                browserHistory.push("");
              }}
            >
              INK Player
            </Typography>
            <OnlyGuestLinks />
            <LogoutButton />
          </Toolbar>
        </AppBar>
        <OnlyAuthLinks />
        <div className={classes.content}>{this.props.children}</div>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
