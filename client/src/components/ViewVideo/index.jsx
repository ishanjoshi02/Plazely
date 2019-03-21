import React, { Component } from "react";
import TruffleContract from "truffle-contract";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  CardContent,
  CardActionArea,
  Card,
  Grid
} from "@material-ui/core/";
import ReactPlayer from "react-player";

import styles from "./styles";

const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(`http://localhost:${7545}`)
);
const VideoStoreArtifact = require("../../contracts/VideoStore.json");
const VideoStore = TruffleContract(VideoStoreArtifact);

class View extends Component {
  state = {
    vidHash: "",
    title: "",
    description: "",
    firstVideo: false
  };

  getVidInfo = () => {
    VideoStore.setProvider(web3.currentProvider);
    const instance = VideoStore.deployed().then(vidInst => {
      const accounts = web3.eth.getAccounts().then(accInst => {
        const vidInfo = vidInst.getVideo.call(1).then(
          res => {
            this.setData(res["hash"], res["title"], res["description"]);
          },
          err => {
            console.log(err);
          }
        );
      });
    });
  };

  setData = (hash, title, description) => {
    this.setState({
      vidHash: hash,
      title: title,
      description: description,
      firstVideo: true
    });
  };

  componentDidMount() {
    this.getVidInfo();
  }

  render() {
    const { classes } = this.props;
    const firstVideo = this.state.firstVideo;
    return (
      <div>
        {firstVideo ? (
          <Card className={classes.card}>
            <CardActionArea>
              <ReactPlayer
                url={"https://ipfs.io/ipfs/" + this.state.vidHash}
                playing
                controls={true}
                width={640}
              />
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.title}
              </Typography>
              <Typography component="p">{this.state.description}</Typography>
            </CardContent>
          </Card>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(View);

//   render() {
//     return (
//       <ReactPlayer
//         url={"https://ipfs.io/ipfs/" + this.state.vidHash}
//         playing
//         controls={true}
//       />
//     );
//   }
// }

// export default View;
