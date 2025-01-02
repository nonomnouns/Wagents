// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking is Ownable {
    IERC20 public token;

    struct StakingTier {
        uint256 minAmount;
        uint256 rewardRate; // Reward rate in percentage (e.g., 10 = 10% per year)
    }

    StakingTier[] public stakingTiers;

    mapping(address => uint256) public stakingBalances;
    mapping(address => uint256) public stakingStartTimes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);

    constructor(address _token) Ownable(msg.sender) {
        token = IERC20(_token);

        // Initialize staking tiers with realistic reward rates
        stakingTiers.push(StakingTier({ minAmount: 1000 * 10**18, rewardRate: 5 })); // Tier 1: 5% APR
        stakingTiers.push(StakingTier({ minAmount: 10000 * 10**18, rewardRate: 10 })); // Tier 2: 10% APR
        stakingTiers.push(StakingTier({ minAmount: 100000 * 10**18, rewardRate: 15 })); // Tier 3: 15% APR
    }

    // User stakes tokens
    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), amount), "Staking failed");

        stakingBalances[msg.sender] += amount;
        stakingStartTimes[msg.sender] = block.timestamp;

        emit Staked(msg.sender, amount);
    }

    // User unstakes tokens
    function unstake() external {
        uint256 amount = stakingBalances[msg.sender];
        require(amount > 0, "No staking found");

        uint256 reward = calculateReward(msg.sender);
        stakingBalances[msg.sender] = 0;
        stakingStartTimes[msg.sender] = 0;

        token.transfer(msg.sender, amount + reward);

        emit Unstaked(msg.sender, amount, reward);
    }

    // Calculate staking reward based on tier
    function calculateReward(address user) public view returns (uint256) {
        uint256 stakingDuration = block.timestamp - stakingStartTimes[user]; // Staking duration in seconds
        uint256 stakingRate = getStakingRate(user); // Reward rate in percentage (e.g., 10 = 10% per year)

        // Convert staking duration to years
        uint256 stakingDurationInYears = stakingDuration / 365 days;

        // Calculate reward using simple interest formula
        uint256 reward = (stakingBalances[user] * stakingRate * stakingDurationInYears) / 100;
        return reward;
    }

    // Get staking rate based on tier
    function getStakingRate(address user) public view returns (uint256) {
        uint256 stakedAmount = stakingBalances[user];
        for (uint256 i = stakingTiers.length; i > 0; i--) {
            if (stakedAmount >= stakingTiers[i - 1].minAmount) {
                return stakingTiers[i - 1].rewardRate;
            }
        }
        return 0; // No reward if no tier is matched
    }

    // Add a new staking tier (admin only)
    function addStakingTier(uint256 minAmount, uint256 rewardRate) external onlyOwner {
        stakingTiers.push(StakingTier({ minAmount: minAmount, rewardRate: rewardRate }));
    }
}