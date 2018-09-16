import React, { Component } from "react";
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
      filePreview: ""
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
    alert("finised local upload");
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
