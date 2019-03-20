import React, { Component } from "react";
import TruffleContract from "truffle-contract";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
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
    description: ""
  };

  getVidInfo = () => {
    VideoStore.setProvider(web3.currentProvider);
    const instance = VideoStore.deployed().then(vidInst => {
      const accounts = web3.eth.getAccounts().then(accInst => {
        const vidInfo = vidInst.getVideo.call(1).then(res => {
          this.setData(res["hash"], res["title"], res["description"]);
        });
      });
    });
  };

  setData = (hash, title, description) => {
    this.setState({
      vidHash: hash,
      title: title,
      description: description
    });
  };

  componentDidMount() {
    this.getVidInfo();
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <ReactPlayer
            url={"https://ipfs.io/ipfs/" + this.state.vidHash}
            playing
            controls={true}
            width={640}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.title}
            </Typography>
            <Typography component="p">{this.state.description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
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
