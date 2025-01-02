// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Utils {
    // Generate a random number
    function randomNumber() internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)));
    }
}