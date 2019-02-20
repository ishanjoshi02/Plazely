const UserStore = artifacts.require("./UserStore.sol");
const VideoStore = artifacts.require("./VideoStore.sol");

module.exports = function(deployer) {
  deployer.deploy(UserStore);
  deployer.deploy(VideoStore);
};
