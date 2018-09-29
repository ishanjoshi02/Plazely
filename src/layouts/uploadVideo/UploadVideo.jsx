import React, { Component } from "react";
import "./UploadVideo.css";
import { browserHistory } from "react-router";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  InputLabel,
  Input,
  FormControl,
  Chip
} from "@material-ui/core";
import { Label } from "semantic-ui-react";
import CardActionArea from "@material-ui/core/CardActionArea";

const IPFS = require("ipfs");
const node = new IPFS();
var Buffer = require("buffer/").Buffer;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: "cover"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  card: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class UploadVideo extends Component {
  constructor(props) {
    super(props);
    // const { classes } = props;
    this.state = {
      title: "",
      description: "",
      author: "",
      dateAdded: "",
      file: null,
      fileName: "Select File",
      filePreview: "",
      ipfsHash: null,
      fileSize: 0,
      percentUploaded: 0
    };

    this.onVideoFileChange = this.onVideoFileChange.bind(this);
    this.onVideoTitleChange = this.onVideoTitleChange.bind(this);
    this.onVideoDescriptionChange = this.onVideoDescriptionChange.bind(this);
    this.onSubmitVideo = this.onSubmitVideo.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);

    node.on("ready", () => {
      console.log("Node is now ready");
    });

    this.reader = null;
  }

  onVideoTitleChange = event => {
    this.setState({
      title: event.target.values
    });
  };

  onVideoDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  onFileLoad = () => {
    this.setState({ file: this.reader.result });
  };

  onVideoFileChange = event => {
    // Setting up File Reader and saving input file as Array Buffer
    this.reader = new FileReader();
    this.reader.onload = this.onFileLoad;
    this.reader.readAsArrayBuffer(event.target.files[0]);
    this.setState({ fileSize: event.target.files[0].size });
    this.setState({ fileName: event.target.files[0].name });
    const { classes } = this.props;
    this.setState({
      filePreview: (
        <CardMedia
          component="video"
          controls
          className={classes.media}
          src={URL.createObjectURL(event.target.files[0])}
          title={event.target.files[0].name}
        />
      )
    });
  };

  setProgressBar = chunks => {
    console.log(chunks);
    this.setState({
      percentUploaded: Math.floor((chunks / this.state.fileSize) * 100)
    });
  };

  onSubmitVideo = event => {
    if (this.state.file != null) {
      // Check if the video title and video description is empty

      const dataObject = Buffer.from(this.state.file);
      console.log("started upload");
      //add code to show progress
      node.files.add(
        dataObject,
        { progress: this.setProgressBar },
        (error, files) => {
          if (error) {
            console.error(error);
          } else {
            browserHistory.push("/watchVideo?hash=" + files[0].hash);
          }
        }
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="container-fluid" style={{ padding: "20px" }}>
        <Card className={classes.card} style={{ width: "60%" }}>
          <CardContent>
            <form>
              <fieldset>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Title"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Description"
                    type="text"
                  />
                </div>
              </fieldset>
            </form>
          </CardContent>
          {this.state.filePreview}
          <CardActions>
            <label className="btn btn-primary" htmlFor="video_file_input">
              {this.state.fileName}
            </label>
            <input
              onChange={this.onVideoFileChange}
              style={{ display: "none" }}
              type="file"
              accept="video"
              id="video_file_input"
            />
            <div
              style={
                this.state.file != null
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <button
                onClick={this.onSubmitVideo}
                className="btn btn-primary"
                role="button"
              >
                Upload
              </button>
            </div>
          </CardActions>

          <div
            style={
              this.state.percentUploaded != 0
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <center>
              {/* <p>{this.state.percentUploaded} %</p> */}
              <Chip
                style={{ marginBottom: "5px" }}
                label={this.state.percentUploaded + "%"}
                color="primary"
              />
            </center>
            <LinearProgress
              variant="determinate"
              value={this.state.percentUploaded}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(UploadVideo);
