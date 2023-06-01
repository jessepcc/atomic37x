// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Atomic37x is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) public tokenIdToLevels;
    mapping(uint256 => uint256) private lastTrainedTime;

    constructor() ERC721("Atomic Habit 37x", "AH37x") {}

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
            "Levels: ",
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
        uint256 level = tokenIdToLevels[tokenId];
        return level.toString();
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

    function createItem() public {
        require(balanceOf(msg.sender) == 0, "Only focus on one goal at a time");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        tokenIdToLevels[newItemId] = 0;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    function giveUp(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Only owner can give up");
        // require that the token has been trained at least once
        require(
            compareStrings(getLevel(tokenId), "0"),
            "Should not give up before start"
        );
        // TODO charge of give up

        _burn(tokenId);
        delete tokenIdToLevels[tokenId];
        delete lastTrainedTime[tokenId];
    }

    function train(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Only owner can train");
        require(
            lastTrainedTime[tokenId] + 1 days <= block.timestamp,
            "Token can only be trained once every 24 hours"
        );
        uint256 currentLevel = tokenIdToLevels[tokenId];
        lastTrainedTime[tokenId] = block.timestamp;
        tokenIdToLevels[tokenId] = currentLevel + 1;
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}
