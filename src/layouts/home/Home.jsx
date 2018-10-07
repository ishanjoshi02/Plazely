import React, { Component } from "react";
import INKVideo from "../../components/INKVideo";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "../../util/wrappers";
import { createNode } from "ipfs";
import "./Home.css";
import Lottie from "react-lottie";
import { browserHistory } from "react-router";
import * as animationData from "./data.json";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import { Icon } from "semantic-ui-react";
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
      isPaused: false
    };
  }

  getUri = hash => {
    return "https://ipfs.io/ipfs/" + hash;
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

    const { classes } = this.props;

    const links = [
      {
        hash: "QmSpQj4KwWNZT7mQsPyCyt2XWMueCgJe1C5PAVdYgYnz2S",
        uuid: "2fef4dc0-c893-11e8-8cb6-af52269aab72"
      }
    ];
    const AuthVideoPlayer = VisibleOnlyAuth(() => (
      <div className={classes.root}>
        <Grid container spacing={8}>
          {" "}
          {links.map(vid => (
            <Grid item key={vid.hash}>
              <Card
                onClick={() => {
                  this.redirectToWatchVideo(vid.uuid);
                }}
                className={classes.card}
              >
                <CardActionArea>
                  {" "}
                  <CardMedia
                    component="video"
                    className={classes.media}
                    src={"https://ipfs.io/ipfs/" + vid.hash}
                  />
                </CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    Placeholder Title
                  </Typography>
                  <Typography component="p">Placeholder Description</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    ));

    const GuestVideoPlayer = HiddenOnlyAuth(() => (
      <div className="home-animation">
        <Lottie
          options={defaultOptions}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
      </div>
    ));

    return (
      <div style={{ paddingTop: "5%" }}>
        <AuthVideoPlayer />
        <GuestVideoPlayer />
      </div>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);
