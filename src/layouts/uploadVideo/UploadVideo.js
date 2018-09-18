import React, { Component } from "react";
const IPFS = require("ipfs");
const node = new IPFS();
var Buffer = require("buffer/").Buffer;
import { browserHistory } from "react-router";

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
      ipfsHash: null
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

    this.setState({
      filePreview: (
        <video controls src={URL.createObjectURL(event.target.files[0])} />
      )
    });
  };

  onSubmitVideo = event => {
    if (this.state.file != null) {
      const dataObject = Buffer.from(this.state.file);
      console.log("started upload");
      //add code to show progress
      node.files.add(dataObject, (error, files) => {
        if (error) {
          console.error(error);
        } else {
          browserHistory.push("/watchVideo?hash=" + files[0].hash);
        }
      });
    }
  };

  render() {
    return (
      <main className="container">
        <div className="row" style={{ width: "100%", marginLeft: "10px" }}>
          <div className="card" style={{ maxWidth: "25rem", height: "100%" }}>
            <div className="card-header">
              <strong>Upload a Video</strong>
            </div>
            <div className="card-body">
              <form>
                <fieldset>
                  <div className="form-group">
                    <input
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Video title"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Video description"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.onVideoFileChange}
                      className="form-control-file"
                      aria-describedby="emailHelp"
                      type="file"
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
          </div>
          <div style={{ float: "right", marginLeft: "20px" }}>
            <center>{this.state.filePreview}</center>
          </div>
        </div>
      </main>
    );
  }
}

export default UploadVideo;
