import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: "./.env" });

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY!!],
    },
  },
};

export default config;
