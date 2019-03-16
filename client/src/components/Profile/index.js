import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import styles from "./styles";

const Profile = props => {
  const { classes } = props;
  const getVideoCount = () => {
    return 0;
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="h5" component="h2" />
        <Typography className={classes.pos} color="textPrimary">
          Email: {props.email}
        </Typography>
        <Typography className={classes.pos} component="p">
          No. of videos uploaded: {getVideoCount()}
        </Typography>
      </CardContent>
    </Card>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
