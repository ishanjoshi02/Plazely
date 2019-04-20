const HDWalletProvider = require("truffle-hdwallet-provider");

require("dotenv").config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  // Removed path since __dirname returns "/" in case of webpack

  contracts_build_directory: "./client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          "analyst ski manage fire paddle farm imitate abandon daughter gain outer foster fame legend pole pudding gravity mandate scale decrease resource wrap mirror hunt",
          "rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY
        ),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000
    },
    main: {
      provider: () =>
        new HDWalletProvider(
          "analyst ski manage fire paddle farm imitate abandon daughter gain outer foster fame legend pole pudding gravity mandate scale decrease resource wrap mirror hunt",
          "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY
        ),
      network_id: 1,
      gas: 3000000,
      gasPrice: 10000000000
    }
  }
};
