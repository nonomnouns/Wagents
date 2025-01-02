// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Dex is Ownable {
    IERC20 public token;
    uint256 public totalWBTInContract;
    uint256 public totalWpoinsInContract;
    uint256 public buyFee = 2; // 2% fee for buying
    uint256 public sellFee = 2; // 2% fee for selling

    mapping(address => uint256) public liquidityProviderShares;

    event TokensPurchased(address indexed user, uint256 amount, uint256 cost);
    event TokensSold(address indexed user, uint256 amount, uint256 revenue);
    event LiquidityAdded(address indexed user, uint256 wbtAmount, uint256 wpoinsAmount);
    event LiquidityRemoved(address indexed user, uint256 wbtAmount, uint256 wpoinsAmount);

    constructor(address _token) Ownable(msg.sender) {
        token = IERC20(_token);
        totalWpoinsInContract = 130_000_000_000 * 10**18;
    }

    // User buys tokens with native token (WBT)
    function buyTokens() external payable {
        require(msg.value > 0, "Amount must be greater than 0");

        uint256 fee = (msg.value * buyFee) / 100;
        uint256 amountAfterFee = msg.value - fee;

        uint256 tokenAmount = (amountAfterFee * totalWpoinsInContract) / (totalWBTInContract + amountAfterFee);
        totalWBTInContract += amountAfterFee;
        totalWpoinsInContract -= tokenAmount;

        token.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, tokenAmount, msg.value);
    }

    // User sells tokens and receives native token (WBT)
    function sellTokens(uint256 tokenAmount) external {
        require(tokenAmount > 0, "Amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), tokenAmount), "Transfer failed");

        uint256 wbtAmount = (tokenAmount * totalWBTInContract) / (totalWpoinsInContract + tokenAmount);
        uint256 fee = (wbtAmount * sellFee) / 100;
        uint256 amountAfterFee = wbtAmount - fee;

        totalWBTInContract -= wbtAmount;
        totalWpoinsInContract += tokenAmount;

        payable(msg.sender).transfer(amountAfterFee);

        emit TokensSold(msg.sender, tokenAmount, amountAfterFee);
    }

    // Add liquidity to the pool
    function addLiquidity(uint256 wbtAmount, uint256 wpoinsAmount) external {
        require(wbtAmount > 0 && wpoinsAmount > 0, "Amounts must be greater than 0");

        // Transfer tokens from user to contract
        require(token.transferFrom(msg.sender, address(this), wpoinsAmount), "Transfer failed");
        payable(address(this)).transfer(wbtAmount);

        // Calculate liquidity provider shares
        uint256 totalLiquidity = totalWBTInContract + totalWpoinsInContract;
        uint256 shares = (wbtAmount + wpoinsAmount) * totalLiquidity / (totalWBTInContract + totalWpoinsInContract);

        // Update liquidity provider shares
        liquidityProviderShares[msg.sender] += shares;

        // Update pool balances
        totalWBTInContract += wbtAmount;
        totalWpoinsInContract += wpoinsAmount;

        emit LiquidityAdded(msg.sender, wbtAmount, wpoinsAmount);
    }

    // Remove liquidity from the pool
    function removeLiquidity(uint256 shares) external {
        require(shares > 0, "Shares must be greater than 0");
        require(liquidityProviderShares[msg.sender] >= shares, "Insufficient shares");

        // Calculate amounts to withdraw
        uint256 totalLiquidity = totalWBTInContract + totalWpoinsInContract;
        uint256 wbtAmount = (shares * totalWBTInContract) / totalLiquidity;
        uint256 wpoinsAmount = (shares * totalWpoinsInContract) / totalLiquidity;

        // Update liquidity provider shares
        liquidityProviderShares[msg.sender] -= shares;

        // Update pool balances
        totalWBTInContract -= wbtAmount;
        totalWpoinsInContract -= wpoinsAmount;

        // Transfer tokens to user
        payable(msg.sender).transfer(wbtAmount);
        token.transfer(msg.sender, wpoinsAmount);

        emit LiquidityRemoved(msg.sender, wbtAmount, wpoinsAmount);
    }

    // Adjust buy and sell fees (admin only)
    function adjustFees(uint256 newBuyFee, uint256 newSellFee) external onlyOwner {
        buyFee = newBuyFee;
        sellFee = newSellFee;
    }
}