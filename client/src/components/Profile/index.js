import React from "react";
import styles from "./styles";
import {
  CardMedia,
  CardContent,
  Divider,
  Card,
  Typography
} from "@material-ui/core";

const Profile = ({ email, name, username }) => {
  return (
    <div style={{ paddingTop: `5%` }} className="container-fluid">
      <Card style={styles.card}>
        <CardContent>
          <Typography
            style={{ marginTop: 10 }}
            gutterBottom
            variant="headline"
            component="h2"
          >
            {name}
          </Typography>
          <Divider />
          <Typography style={{ marginTop: 10 }} component="p">
            {username}
          </Typography>
          <Typography style={{ marginTop: 10 }} component="p">
            {email}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
