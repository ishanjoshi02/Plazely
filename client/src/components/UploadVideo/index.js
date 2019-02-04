import React, { Component } from "react";
// import { uploadVideo } from "../../actions";
// import { connect } from "react-redux";
import {
  withStyles,
  Card,
  CardContent,
  Select,
  MenuItem,
  CardActions,
  CardMedia,
  Chip,
  LinearProgress
} from "@material-ui/core";

// CSS
import styles from "./styles";

const IPFS = require("ipfs");

class UploadVideo extends Component {
  state = {
    title: "",
    description: "",
    category: "",
    file: null,
    uploading: false,
    percentUploaded: 0
  };
  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };
  handleCategoryChange = e => {
    this.setState({ category: e.target.value });
  };
  handleFileChange = e => {
    const file = e.target.files[0];
    this.setState({ file });
  };
  renderCategoriesOptions = () => {
    const categories = [
      "",
      "Music",
      "Gaming",
      "Trailer",
      "Vlogs",
      "Advertisement"
    ];
    return categories.map((item, i) => (
      <MenuItem key={i} value={item}>
        {item}
      </MenuItem>
    ));
  };
  renderFilePreview = () => {
    const { classes } = this.props;
    return this.state.file ? (
      <CardMedia
        component="video"
        controls
        style={{ height: "560px", background: "#000000" }}
        className={classes.media}
        src={URL.createObjectURL(this.state.file)}
        title={this.state.file.name}
      />
    ) : null;
  };
  setProgressBar = chunks => {
    console.log(chunks);
    this.setState({
      percentUploaded: Math.floor((chunks / this.state.file.size) * 100)
    });
  };
  uploadFileToIPFS = file => {
    const node = new IPFS();
    node.files.add(file, { progress: this.setProgressBar }, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        console.log(files);
      }
    });
  };
  submitVideo = e => {
    const { file } = this.state;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = e => {
      const { result } = e.target;
      this.uploadFileToIPFS(result);
    };
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="container-fluid" style={{ padding: "5%" }}>
        <Card className={classes.card} style={{ width: "70%" }}>
          <CardContent>
            <form>
              <fieldset>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Title"
                    type="text"
                    onChange={this.handleTitleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Description"
                    type="text"
                    onChange={this.handleDescriptionChange}
                  />
                </div>
                <Select
                  style={{ minWidth: 120, width: "auto" }}
                  value={this.state.category}
                  onChange={this.handleCategoryChange}
                >
                  {this.renderCategoriesOptions()}
                </Select>
              </fieldset>
            </form>
          </CardContent>
          {this.renderFilePreview()}
          <CardActions>
            <label
              className={
                !this.state.uploading
                  ? "btn btn-primary"
                  : "btn btn-primary disabled"
              }
              htmlFor="video_file_input"
            >
              {this.state.file ? this.state.file.name : `Select File`}
            </label>
            <input
              disabled={this.state.uploading}
              onChange={this.handleFileChange}
              style={{ display: "none" }}
              accept="video"
              id="video_file_input"
              type="file"
            />
            <div
              style={
                this.state.file && this.state.file.size > 0
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <button
                className="btn btn-primary"
                disabled={this.state.uploading}
                onClick={this.submitVideo}
              >
                Upload
              </button>
            </div>
          </CardActions>{" "}
          <div
            style={
              this.state.percentUploaded !== 0
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <center>
              <Chip
                style={{ marginBottom: "5px" }}
                label={`${this.state.percentUploaded}%`}
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
