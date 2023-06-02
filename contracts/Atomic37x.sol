// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Atomic37x is ERC721, ERC721Enumerable, ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public owner;

    struct Habit {
        uint256 level;
        uint256 lastTrainedTime;
        string goal;
    }

    mapping(uint256 => Habit) public habits;

    constructor() ERC721("Atomic Habit 37x", "AH37x") {
        owner = msg.sender;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function compareStrings(
        string memory s1,
        string memory s2
    ) public pure returns (bool) {
        return keccak256(bytes(s1)) == keccak256(bytes(s2));
    }

    function generateSVG(uint256 tokenId) public view returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Atomic 37x",
            "</text>",
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Day: ",
            getLevel(tokenId),
            "</text>",
            "</svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getLevel(uint256 tokenId) public view returns (string memory) {
        Habit memory habit = habits[tokenId];
        return habit.level.toString();
    }

    function getLastTrainedTime(uint256 tokenId) public view returns (uint256) {
        Habit memory habit = habits[tokenId];
        return habit.lastTrainedTime;
    }

    function setLastTrainedTime(uint256 tokenId, uint256 time) public {
        Habit memory habit = habits[tokenId];
        habit.lastTrainedTime = time;
        habits[tokenId] = habit;
    }

    function increaseLevel(uint256 tokenId) public {
        Habit memory habit = habits[tokenId];
        habit.level = habit.level + 1;
        habits[tokenId] = habit;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Atomic Habit #',
            tokenId.toString(),
            '",',
            '"description": "Build your atomic habit on chain",',
            '"image": "',
            generateSVG(tokenId),
            '"',
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function createItem(string calldata goal) public {
        require(bytes(goal).length > 0, "Goal cannot be empty");
        require(bytes(goal).length < 280, "Goal cannot be longer than 280");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        habits[newItemId] = Habit(0, block.timestamp, goal);
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    function giveUp(uint256 tokenId) public payable {
        require(ownerOf(tokenId) == msg.sender, "Only owner can give up");
        // require that the token has been trained at least once
        require(
            compareStrings(getLevel(tokenId), "0"),
            "Should not give up before start"
        );
        // pay the owner of contract 0.001 ETH in order to give up
        require(msg.value == 0.001 ether, "Need to pay 0.001 ETH to give up");
        payable(owner).transfer(msg.value);

        _burn(tokenId);
        delete habits[tokenId];
    }

    function train(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Only owner can train");
        require(
            getLastTrainedTime(tokenId) + 1 days <= block.timestamp,
            "Token can only be trained once every 24 hours"
        );

        require(
            getLastTrainedTime(tokenId) + 30 days >= block.timestamp,
            "You have not trained for 30 days, you need to give up and start over"
        );

        setLastTrainedTime(tokenId, block.timestamp);
        increaseLevel(tokenId);
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}
