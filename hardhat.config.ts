import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const config: HardhatUserConfig = {
	solidity: "0.8.17",
	networks: {
		goerli: {
			url: process.env.TESTNET_RPC,
			accounts: [`${process.env.PRIVATE_KEY}`],
		},
	},
	etherscan: {
		apiKey: process.env.ALCHEMY_API_KEY,
	},
};

export default config;
