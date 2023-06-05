import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        goerli: {
            url: process.env.TESTNET_RPC,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        sepolia: {
            url: process.env.SEPOLIA_RPC,
            accounts: [`${process.env.SEPOLIA_ACCOUNT_KEY}`],
        },
    },
    etherscan: {
        apiKey: process.env.ALCHEMY_API_KEY,
    },
};

export default config;
