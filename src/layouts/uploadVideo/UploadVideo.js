import React, { Component } from "react";
import "./UploadVideo.css";
import Dashboard from "../dashboard/Dashboard";
const IPFS = require("ipfs");
const node = new IPFS();
var Buffer = require("buffer/").Buffer;
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
      vidCount: 0
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
    console.log("started uploading");
    this.setState({ file: this.reader.result });
    alert("Finished local upload");
  };

  onVideoFileChange = event => {
    // Setting up File Reader and saving input file as Array Buffer
    this.reader = new FileReader();
    this.reader.onload = this.onFileLoad;
    this.reader.readAsArrayBuffer(event.target.files[0]);

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

  onSubmitVideo = event => {
    console.log(this.state.file);
    const dataObject = Buffer.from(this.state.file);
    console.log("uploading to ipfs");
    node.files.add(dataObject, function(error, files) {
      if (error) {
        console.error(error);
      } else {
        console.log(files);
        alert("File now on IPFS");
        // add file metadata such as author, description, title from this.state to bigchain db

        // after adding redirect to viewing page. pass the ipfs hash as query
      }
    });
    this.setState({
      vidCount: this.state.vidCount + 1
    });
    console.log(this.state.vidCount);
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
          </div>
          <div style={{ float: "right", marginLeft: "20px" }}>
            <center>{this.state.filePreview}</center>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadVideo;
