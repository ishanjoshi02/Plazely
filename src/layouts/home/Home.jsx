import React, { Component } from "react";
import INKVideo from "../../components/INKVideo";
import {
  applicationID,
  applicationKey,
  API_PATH
} from "../../keys/bigchaindbKey";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "../../util/wrappers";
import { createNode } from "ipfs";
const driver = require("bigchaindb-driver");
import "./Home.css";
import Lottie from "react-lottie";
import * as animationData from "./data.json";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Orm from "bigchaindb-orm";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { browserHistory } from "react-router";
import {
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import PreviewVideo from "../../components/PreviewVideo";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    maxWidth: 345
  },
  media: {
    // height: 140,
    width: "100%"
  }
});
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestHash:
        "https://ipfs.io/ipfs/QmTKZgRNwDNZwHtJSjCp6r5FYefzpULfy37JvMt9DwvXse/video.mp4",
      isStopped: false,
      isPaused: false,
      conn: null
    };
  }

  componentWillMount() {}

  getUUID = hash => {
    const conn = new driver.Connection(API_PATH, {
      app_id: applicationID,
      app_key: applicationKey
    });
    console.log(conn);
    conn.searchAssets(hash).then(assets => {
      console.log(assets[0].data.uuid);
      return assets[0].data.uuid;
    });
  };
  getHash = hash => {
    const conn = new driver.Connection(API_PATH, {
      app_id: applicationID,
      app_key: applicationKey
    });
    conn.searchAssets(hash).then(assets => {
      return assets[0].data.videoHashes["720p"];
    });
  };

  redirectToWatchVideo = uuid => {
    browserHistory.push("/watchVideo?uuid=" + uuid);
  };
  render() {
    const node = createNode();
    node.on("ready", () => {
      console.log(node);
    });
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    const links = [
      "id:9b81ac62:Movie:e9103f89-e3e4-4b2a-8efc-ff36f46fd490",
      "id:9b81ac62:Movie:24dc8b0e-6756-4c52-82a4-e0fa0f4c5d9d"
    ];
    const { classes } = this.props;
    return (
      <div style={{ paddingTop: "5%" }}>
        <div className={classes.root}>
          <Grid container spacing={8}>
            {" "}
            {links.map(vid => (
              <PreviewVideo
                onClick={() => {
                  console.log(vid);
                  this.redirectToWatchVideo(vid);
                }}
                key={vid}
                uuid={vid}
              />
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);
