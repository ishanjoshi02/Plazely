import React from "react";

const LoginButton = ({ onLoginUserClick }) => {
  return (
    <a className="nav-link" href="#" onClick={event => onLoginUserClick(event)}>
      Login with UPort
    </a>
  );
};

export default LoginButton;
