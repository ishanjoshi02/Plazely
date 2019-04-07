import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Card, CardContent, Button } from "@material-ui/core";

import styles from "./styles";

class Edit extends Component {
  state = {
    firstname: this.props.name.split(" ")[0],
    lastname: this.props.name.split(" ")[1],
    username: this.props.username,
    email: this.props.email
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label="First Name"
              className={classes.textField}
              value={this.state.firstname}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Last Name"
              className={classes.textField}
              value={this.state.lastname}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Username"
              className={classes.textField}
              value={this.state.username}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
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
