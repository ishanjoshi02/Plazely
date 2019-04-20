import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import TruffleContract from "truffle-contract";

import styles from "./styles";

const Web3 = require("web3");
// const web3 = new Web3(
//   new Web3.providers.HttpProvider(`http://localhost:${7545}`)
// );
const web3 = new Web3(window.web3.currentProvider);
const VideoStoreArtifact = require("../../contracts/VideoStore.json");
const VideoStore = TruffleContract(VideoStoreArtifact);

class Profile extends Component {
  state = {
    open: false,
    password: "",
    vidCount: 0
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  retVidCound = () => {
    VideoStore.setProvider(web3.currentProvider);
    const instance = VideoStore.at(
      `0x90154d3e6bcf0eb951b501eca479c1224fb125c6`
    ).then(vidInst => {
      const accounts = web3.eth.getAccounts().then(accInst => {
        const count = vidInst.getVideoListCount
          .call({
            from: accInst[0]
          })
          .then(
            res => {
              this.changeCount(res["words"][0]);
            },
            err => {
              console.log(err);
            }
          );
      });
    });
  };

  changeCount = videoCount => {
    this.setState({
      vidCount: videoCount
    });
  };

  componentDidMount() {
    this.retVidCound();
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            {this.props.name}
          </Typography>
          <Typography variant="h5" component="h2" />
          <Typography className={classes.pos} color="textPrimary">
            Email: {this.props.email}
          </Typography>
          <Typography className={classes.pos} component="p">
            No. of videos uploaded: {this.state.vidCount}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpen}
          >
            Change Password
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Submit</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter new password</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Password"
                type="password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="default">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
