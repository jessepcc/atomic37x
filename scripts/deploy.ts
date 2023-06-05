import { ethers } from "hardhat";

async function main() {
    const Atomic38x = await ethers.getContractFactory("Atomic38x");
    const atomic38x = await Atomic38x.deploy();

    await atomic38x.deployed();
    console.log(`Deployed to ${atomic38x.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.]

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
