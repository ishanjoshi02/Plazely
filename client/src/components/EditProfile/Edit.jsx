import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

class Edit extends Component {
  render() {
    return <div>Edit Profile Page</div>;
  }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Edit);
