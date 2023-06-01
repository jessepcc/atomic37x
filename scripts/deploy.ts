import { ethers } from "hardhat";

async function main() {
    const Atomic37x = await ethers.getContractFactory("Atomic37x");
    const atomic37x = await Atomic37x.deploy();

    await atomic37x.deployed();
    console.log(`Deployed to ${atomic37x.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.]

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
