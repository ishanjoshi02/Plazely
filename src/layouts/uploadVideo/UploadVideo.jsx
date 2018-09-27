import React, { Component } from "react";
import "./UploadVideo.css";
import { browserHistory } from "react-router";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const IPFS = require("ipfs");
const node = new IPFS();
var Buffer = require("buffer/").Buffer;

const styles = {
  root: {
    flexGrow: 1
  }
};

class UploadVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      author: "",
      dateAdded: "",
      file: null,
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
      title: event.target.value
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
    this.setState({
      filePreview: (
        <video
          className="video-preview"
          controls
          src={URL.createObjectURL(event.target.files[0])}
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
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="card upload-info">
            <div className="card-header">
              <strong>
                <center>Upload a Video</center>
              </strong>
            </div>
            <div className="card-body">
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
                  <div className="form-group">
                    <input
                      onChange={this.onVideoFileChange}
                      className="form-control-file"
                      type="file"
                      accept="video/*"
                    />
                  </div>

                  <button
                    onClick={this.onSubmitVideo}
                    className="btn btn-primary"
                    type="button"
                  >
                    Upload
                  </button>
                </fieldset>
              </form>
            </div>
            <LinearProgress
              variant="determinate"
              value={this.state.percentUploaded}
            />
          </div>

          <div style={{ float: "right", marginLeft: "20px" }}>
            <center>{this.state.filePreview}</center>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UploadVideo);
