import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  render() {
    return (
      <main className="container">
        <div className="card text-black border-primary">
          <div className="card-header">Dashboard</div>
          <div className="card-body">
            <p className="card-text">
              <strong>Welcome {this.props.authData.name}!</strong>
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export default Dashboard;
