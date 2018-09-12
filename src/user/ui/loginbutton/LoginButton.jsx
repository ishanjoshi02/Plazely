import React from "react";

// Images
import uPortLogo from "../../../img/uport-logo.svg";

const LoginButton = ({ onLoginUserClick }) => {
  return (
    <a className="nav-link" href="#" onClick={event => onLoginUserClick(event)}>
      Login with UPort
    </a>
  );
};

export default LoginButton;
