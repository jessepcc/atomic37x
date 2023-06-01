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
        await this.atomic37x.createItem();
    });

    it("Creates a token collection with a name", async function () {
        expect(await this.atomic37x.name()).to.exist;
        expect(await this.atomic37x.name()).to.equal("Atomic Habit 37x");
    });

    it("Creates a token collection with a symbol", async function () {
        expect(await this.atomic37x.symbol()).to.exist;
        expect(await this.atomic37x.symbol()).to.equal("AH37x");
    });

    it("Mints a token", async function () {
        expect(await this.atomic37x.balanceOf(this.contractOwner)).to.equal(1);
        expect(await this.atomic37x.ownerOf(1)).to.equal(this.contractOwner);
    });

    it("Can only possess one NFT for each address", async function () {
        await expect(this.atomic37x.createItem()).to.be.revertedWith(
            "Only focus on one goal at a time"
        );
    });
    it("Owner can train the NFT", async function () {
        await this.atomic37x.train(1);
        expect(await this.atomic37x.getLevel(1)).to.equal("1");
    });

    it("NFT tokenURI change after train", async function () {
        await this.atomic37x.train(1);
        const image_string =
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">Atomic 37x</text><text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">Levels: 1</text></svg>';

        const dataURL = await this.atomic37x.tokenURI(1);
        const result = Buffer.from(dataURL.split(",")[1], "base64").toString();
        const parsed = JSON.parse(result);
        const image = Buffer.from(
            parsed["image"].split(",")[1],
            "base64"
        ).toString();

        expect(parsed["name"]).to.equal("Atomic Habit #1");
        expect(parsed["description"]).to.equal(
            "Build your atomic habit on chain"
        );
        expect(image).to.equal(image_string);
    });

    it("Cannot train twice within 1 day", async function () {
        await this.atomic37x.train(1);
        await expect(this.atomic37x.train(1)).to.be.revertedWith(
            "Token can only be trained once every 24 hours"
        );
    });

    it("Can train again after 1 day", async function () {
        await this.atomic37x.train(1);
        await time.increase(time.duration.days(1));
        await this.atomic37x.train(1);
        expect(await this.atomic37x.getLevel(1)).to.equal("2");
    });

    it("Other address cannot train the NFT", async function () {
        const collectorSigner = await ethers.getSigner(this.collector);
        await expect(
            this.atomic37x.connect(collectorSigner).train(1)
        ).to.be.revertedWith("Only owner can train");
    });

    it("Cannot train an non-existing NFT", async function () {
        await expect(this.atomic37x.train(2)).to.be.revertedWith(
            "Token does not exist"
        );
    });

    it("Other address cannot give up", async function () {
        const collectorSigner = await ethers.getSigner(this.collector);
        await expect(
            this.atomic37x.connect(collectorSigner).giveUp(1)
        ).to.be.revertedWith("Only owner can give up");
    });

    it("Owner can give up", async function () {
        await this.atomic37x.giveUp(1);
        // expect the nft burned
        await expect(this.atomic37x.ownerOf(1)).to.be.revertedWith(
            "ERC721: invalid token ID"
        );
    });
});
