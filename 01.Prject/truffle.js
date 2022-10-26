const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({ path: "./.env" });

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777", // Match any network id
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://data-seed-prebsc-1-s1.binance.org:8545`
        ),
      network_id: 97,
      // confirmations: 10,
      // timeoutBlocks: 200,
      // skipDryRun: true,
    },
    bsc: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://bsc-dataseed1.binance.org`
        ),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
