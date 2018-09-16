import React, { Component } from "react";
import "./Dashboard.css";
import { Link } from "react-router";

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  render() {
    return (
      <div className="container">
        <div className="card text-black border">
          <div className="card-header">Dashboard</div>
          <div className="card-body">
            <p className="card-text">
              <p>
                Welcome <strong>{this.props.authData.name}!</strong>
              </p>
              <Link to="uploadVideo">
                <button className="upload-video btn btn-primary">
                  Upload Video
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
