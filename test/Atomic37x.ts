import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Atomic37x", function () {
    before(async function () {
        this.Atomic37x = await ethers.getContractFactory("Atomic37x");
    });

    beforeEach(async function () {
        this.atomic37x = await this.Atomic37x.deploy();
        await this.atomic37x.deployed();

        const signers = await ethers.getSigners();
        this.contractOwner = signers[0].address;
        this.collector = signers[1].address;

        // mint 1 token for the contractOwner
        await this.atomic37x.mint(this.contractOwner, 1);
    });

    it("Creates a token collection with a name", async function () {
        expect(await this.atomic37x.name()).to.exist;
        // expect(await this.nonFunToken.name()).to.equal('NonFunToken');
    });

    it("Creates a token collection with a symbol", async function () {
        expect(await this.atomic37x.symbol()).to.exist;
        // expect(await this.nonFunToken.symbol()).to.equal('NONFUN');
    });

    it("Mints a token", async function () {
        expect(await this.atomic37x.balanceOf(this.contractOwner)).to.equal(1);
        expect(await this.atomic37x.ownerOf(1).to.equal(this.contractOwner));
    });
});
