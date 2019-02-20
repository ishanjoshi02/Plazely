import React from "react";
import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider(`http://localhost:${8545}`)
);

web3.eth.getAccounts((err, res) => {
  const first = res[0];
  console.log(`Address is: ${first}`);
  web3.eth.getBalance(first, (err, res) => {
    console.log(`Balance is: ${res}`);
  });
});

const Profile = props => {
  return <div>Profile</div>;
};

export default Profile;
