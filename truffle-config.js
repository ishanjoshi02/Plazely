const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
<<<<<<< HEAD
      network_id: "*" // Match any network id
=======
      network_id: "*"
>>>>>>> dc99fc311fa99abf38c957928cebfe6a0cb63d62
    }
  }
};
