import React, { Component } from "react";
import "./Dashboard.css";
import { Link } from "react-router";
import UploadVideo from "../uploadVideo/UploadVideo";

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="card text-black border">
          <div className="card-header">Dashboard</div>
          <div className="card-body">
            <p className="card-text">
              Welcome <strong>{this.props.authData.name}!</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
