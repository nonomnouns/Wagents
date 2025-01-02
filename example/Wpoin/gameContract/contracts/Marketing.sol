// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Wpoins.sol";

contract Marketing is Ownable {
    Wpoins public token;

    struct UserInfo {
        string username;
        string avatar;
        string referralCode;
        uint256 referralCount;
        uint256 totalReferralEarnings;
        uint256 totalReferralWins;
    }

    mapping(address => UserInfo) public users;
    mapping(string => address) public codeToUser;

    uint256 public constant REFERRAL_REGISTRATION_REWARD = 1000 * 10**18; // 1000 Wpoins for referee
    uint256 public constant REFERRER_REWARD = 1000 * 10**18; // 1000 Wpoins for referrer
    uint256 public constant REFERRER_WIN_SHARE = 5; // 0.5% of referee's winnings

    event ReferralRegistered(address indexed user, string username, string avatar, string referralCode);
    event ReferralUsed(address indexed user, string referralCode, address indexed referrer);
    event ReferrerReward(address indexed referrer, address indexed referee, uint256 reward);

    constructor(address _token) Ownable(msg.sender) {
        token = Wpoins(_token);
    }

    // User registers with username, avatar, and optional referral code
    function register(string memory username, string memory avatar, string memory referralCode) external {
        require(bytes(users[msg.sender].username).length == 0, "User already registered");

        // Generate a unique referral code for the user
        string memory newReferralCode = generateReferralCode(msg.sender);

        // Save user info
        users[msg.sender] = UserInfo({
            username: username,
            avatar: avatar,
            referralCode: newReferralCode,
            referralCount: 0,
            totalReferralEarnings: 0,
            totalReferralWins: 0
        });

        codeToUser[newReferralCode] = msg.sender;
        emit ReferralRegistered(msg.sender, username, avatar, newReferralCode);

        // Use the referral code if provided
        if (bytes(referralCode).length > 0) {
            address referrer = codeToUser[referralCode];
            if (referrer != address(0) && referrer != msg.sender) {
                // Reward referrer and referee
                token.transfer(referrer, REFERRER_REWARD);
                token.transfer(msg.sender, REFERRAL_REGISTRATION_REWARD);

                // Increment referrer's referral count
                users[referrer].referralCount += 1;

                emit ReferralUsed(msg.sender, referralCode, referrer);
            }
        }
    }

    // Reward referrer when referee wins a game
    function rewardReferrer(address referee, uint256 winAmount) external onlyOwner {
        address referrer = codeToUser[users[referee].referralCode];
        if (referrer != address(0)) {
            uint256 referrerReward = (winAmount * REFERRER_WIN_SHARE) / 1000; // 0.5%
            token.transfer(referrer, referrerReward);
            users[referrer].totalReferralEarnings += referrerReward;
            users[referrer].totalReferralWins += 1;
            emit ReferrerReward(referrer, referee, referrerReward);
        }
    }

    // Generate a unique referral code
    function generateReferralCode(address user) private pure returns (string memory) {
        bytes32 hash = keccak256(abi.encodePacked(user));
        bytes memory code = new bytes(5);
        for (uint256 i = 0; i < 5; i++) {
            code[i] = _toHexChar(uint8(hash[i]) % 16);
        }
        return string(abi.encodePacked("0x", code));
    }

    function _toHexChar(uint8 value) private pure returns (bytes1) {
        if (value < 10) {
            return bytes1(value + 48); // 0-9
        } else {
            return bytes1(value + 87); // a-f
        }
    }
}