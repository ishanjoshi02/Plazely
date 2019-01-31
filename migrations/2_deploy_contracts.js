const UserStore = artifacts.require("./UserStore.sol");

module.exports = function(deployer) {
  deployer.deploy(UserStore);
};
