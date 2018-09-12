import React, { Component } from "react";

class UploadVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      author: "",
      dateAdded: "",
      fileLocation: "",
      filePreview: ""
    };

    this.onVideoFileChange = this.onVideoFileChange.bind(this);
    this.onVideoTitleChange = this.onVideoTitleChange.bind(this);
    this.onVideoDescriptionChange = this.onVideoDescriptionChange.bind(this);
    this.onSubmitVideo = this.onSubmitVideo.bind(this);
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

  onVideoFileChange = event => {
    this.setState({
      filePreview: (
        <video controls src={URL.createObjectURL(event.target.files[0])} />
      )
    });
  };

  onSubmitVideo = event => {};

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
