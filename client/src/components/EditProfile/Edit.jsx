import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Card, CardContent, Button } from "@material-ui/core";
import TruffleContract from "truffle-contract";

import styles from "./styles";

const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(`http://localhost:${7545}`)
);
const UserStoreArtifact = require("../../contracts/UserStore.json");
const UserStore = TruffleContract(UserStoreArtifact);

class Edit extends Component {
  state = {
    name: this.props.name,
    username: this.props.username,
    email: this.props.email
  };

  //Changing input field
  handleChange = param => event => {
    this.setState({
      [param]: event.target.value
    });
  };

  // You cannot change email for now. After changing name and username, hard refresh profile to see changes.
  // Will probably solve by next commit

  changeUserName = () => {
    UserStore.setProvider(web3.currentProvider);
    const instance = UserStore.deployed().then(userInst => {
      const accounts = web3.eth.getAccounts().then(accInst => {
        //sendTransaction is used for writing, since data is modified in the blockchain
        userInst.changeInfo
          .sendTransaction(
            this.props.email,
            this.state.name,
            this.state.username,
            this.state.email,
            {
              from: accInst[0]
            }
          )
          .then(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
      });
    });
  };

  // The below 2 functions are used to update the data automatically
  // On removing these two, data won't update even after traversing between pages
  // A hard refresh i.e F5 is needed to udpate the data

  setThoseStates = (name, username, email) => {
    this.setState({
      name: name,
      username: username,
      email: email
    });
  };

  getUserData = () => {
    UserStore.setProvider(web3.currentProvider);
    const instance = UserStore.deployed().then(userInst => {
      const accounts = web3.eth.getAccounts().then(accInst => {
        //call is used for reading purposes
        userInst.getUser
          .call(this.props.email, {
            from: accInst[0]
          })
          .then(
            res => {
              console.log(res);
              this.setThoseStates(res["name"], res["username"], res["email"]);
            },
            err => {
              console.log(err);
            }
          );
      });
    });
  };

  //To update data on mounting component
  componentDidMount() {
    this.getUserData();
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Username"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange("username")}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={this.changeUserName}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Edit);
