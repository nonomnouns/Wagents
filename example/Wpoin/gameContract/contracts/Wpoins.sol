// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Wpoins is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 130_000_000_000 * 10**18; // 130 billion tokens

    constructor() ERC20("Wpoins", "WPN") Ownable(msg.sender) {
        _mint(msg.sender, MAX_SUPPLY);
    }

    // Admin can mint new tokens (within max supply)
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    // Admin can burn tokens
    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }
}