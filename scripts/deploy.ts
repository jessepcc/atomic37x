import { ethers } from "hardhat";

async function main() {
	const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
	const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

	const Atomic37x = await ethers.getContractFactory("Atomic37x");
	const atomic37x = await Atomic37x.deploy();

	await atomic37x.deployed();
	console.log(`Deployed to ${atomic37x.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
