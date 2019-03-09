import React from "react";

const Profile = ({ email, name, username }) => {
  return (
    <div>
      Profile
      <br />
      {email}
      <br />
      {name}
      <br />
      {username}
    </div>
  );
};

export default Profile;
