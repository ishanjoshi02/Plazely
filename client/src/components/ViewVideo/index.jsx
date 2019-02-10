import React, { useState } from "react";

const View = props => {
  const id = props.match.params.id;
  return <React.Fragment>{id}</React.Fragment>;
};

export default View;
