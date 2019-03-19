import React, { Component } from "react";
import TruffleContract from "truffle-contract";

const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(`http://localhost:${7545}`)
);
const VideoStoreArtifact = require("../../contracts/VideoStore.json");
const VideoStore = TruffleContract(VideoStoreArtifact);

class View extends Component {
  getVidInfo = () => {
    VideoStore.setProvider(web3.currentProvider);
    const instance = VideoStore.deployed().then(vidInst => {
      const accounts = web3.eth.getAccounts().then(accInst => {
        const vidInfo = vidInst.getVideo.call(1).then(res => {
          console.log(res);
        });
      });
    });
  };

  componentDidMount() {
    this.getVidInfo();
  }
  render() {
    return <div>This is View</div>;
  }
}

export default View;
