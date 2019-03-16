import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TruffleContract from "truffle-contract";

import styles from "./styles";

const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(`http://localhost:${7545}`)
);
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
    const instance = VideoStore.deployed().then(vidInst => {
      const accounts = web3.eth.getAccounts().then(accInst => {
        const count = vidInst.getVideoListCount
          .call({
            from: accInst[0]
          })
          .then(res => {
            this.changeCount(res["words"][0]);
          });
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
