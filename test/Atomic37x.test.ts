import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { DOMParser } from "xmldom";
import { ethers } from "hardhat";

describe("Atomic38x", function () {
    before(async function () {
        this.Atomic38x = await ethers.getContractFactory("Atomic38x");
    });

    beforeEach(async function () {
        this.atomic38x = await this.Atomic38x.deploy();
        await this.atomic38x.deployed();
        const signers = await ethers.getSigners();
        this.contractOwner = signers[0].address;
        this.collector = signers[1].address;
        this.anotherCollector = signers[2].address;
        await this.atomic38x.createItem("First Habit");
    });

    it("Creates a token collection with a name", async function () {
        expect(await this.atomic38x.name()).to.exist;
        expect(await this.atomic38x.name()).to.equal("Atomic Habit 38x");
    });

    it("Creates a token collection with a symbol", async function () {
        expect(await this.atomic38x.symbol()).to.exist;
        expect(await this.atomic38x.symbol()).to.equal("AH38x");
    });

    it("Mints a token", async function () {
        expect(await this.atomic38x.balanceOf(this.contractOwner)).to.equal(1);
        expect(await this.atomic38x.ownerOf(1)).to.equal(this.contractOwner);
    });

    it("Goal cannot be empty", async function () {
        const collectorSigner = await ethers.getSigner(this.anotherCollector);
        await expect(
            this.atomic38x.connect(collectorSigner).createItem("")
        ).to.be.revertedWith("Goal cannot be empty");
    });

    it("Goal cannot be over 50 characters", async function () {
        const collectorSigner = await ethers.getSigner(this.anotherCollector);
        await expect(
            this.atomic38x
                .connect(collectorSigner)
                .createItem(
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s . industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s "
                )
        ).to.be.revertedWith("Goal cannot be longer than 280");
    });

    it("Owner can train the NFT", async function () {
        await time.increase(time.duration.days(1));
        await this.atomic38x.train(1);
        expect(await this.atomic38x.getLevel(1)).to.equal("1");
    });

    it("NFT tokenURI change after train", async function () {
        await time.increase(time.duration.days(1));
        await this.atomic38x.train(1);
        const dataURL = await this.atomic38x.tokenURI(1);
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

        const parser = new DOMParser();
        const doc = parser.parseFromString(image, "image/svg+xml");
        expect(doc.documentElement.nodeName).to.equal("svg");
        // expect image is a valid svg string
    });

    it("Cannot train twice within 1 day", async function () {
        await time.increase(time.duration.days(1));
        await this.atomic38x.train(1);
        await expect(this.atomic38x.train(1)).to.be.revertedWith(
            "Token can only be trained once every 24 hours"
        );
    });

    it("Can train again after 1 day", async function () {
        await time.increase(time.duration.days(1));
        await this.atomic38x.train(1);
        await time.increase(time.duration.days(1));
        await this.atomic38x.train(1);
        expect(await this.atomic38x.getLevel(1)).to.equal("2");
    });

    it("Cannot train idle for 30 day", async function () {
        await time.increase(time.duration.days(1));
        await this.atomic38x.train(1);
        await time.increase(time.duration.days(30));
        await expect(this.atomic38x.train(1)).to.be.revertedWith(
            "You have not trained for 30 days, you need to give up and start over"
        );
    });

    it("Other address cannot train the NFT", async function () {
        const collectorSigner = await ethers.getSigner(this.collector);
        await expect(
            this.atomic38x.connect(collectorSigner).train(1)
        ).to.be.revertedWith("Only owner can train");
    });

    it("Cannot train an non-existing NFT", async function () {
        await expect(this.atomic38x.train(2)).to.be.revertedWith(
            "Token does not exist"
        );
    });

    it("Other address cannot give up", async function () {
        const collectorSigner = await ethers.getSigner(this.collector);
        await expect(
            this.atomic38x.connect(collectorSigner).giveUp(1)
        ).to.be.revertedWith("Only owner can give up");
    });

    it("Pay 0.001 eth to give up", async function () {
        await expect(
            this.atomic38x.giveUp(1, {
                value: ethers.utils.parseEther("0.0005"),
            })
        ).to.be.revertedWith("Need to pay 0.001 ETH to give up");
    });

    it("Owner can give up", async function () {
        await this.atomic38x.giveUp(1, {
            value: ethers.utils.parseEther("0.001"),
        });
        // expect the nft burned
        await expect(this.atomic38x.ownerOf(1)).to.be.revertedWith(
            "ERC721: invalid token ID"
        );
    });
});
