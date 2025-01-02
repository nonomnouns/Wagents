// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Game.sol";

contract Leaderboard is Ownable {
    Game public game;

    struct LeaderboardEntry {
        address user;
        uint256 totalWins;
        uint256 totalLoses;
        uint256 totalDraws;
        uint256 totalWpoinsWon;
        uint256 totalWpoinsLost;
        uint256 totalBetAmount;
        uint256 winrate;
        uint256 averageBetAmount;
    }

    LeaderboardEntry[] public leaderboard;

    event LeaderboardUpdated(address indexed user, LeaderboardEntry entry);

    constructor(address _game) Ownable(msg.sender) {
        game = Game(_game);
    }

    // Update leaderboard for a user
    function updateLeaderboard(address user) external {
        uint256 totalWins = game.totalWins(user);
        uint256 totalLoses = game.totalLoses(user);
        uint256 totalDraws = game.totalDraws(user);
        uint256 totalWpoinsWon = game.getTotalWpoinsWon(user);
        uint256 totalWpoinsLost = game.getTotalWpoinsLost(user);
        uint256 totalBetAmount = game.getTotalBetAmount(user);
        uint256 winrate = game.calculateWinrate(user);
        uint256 averageBetAmount = game.calculateAverageBetAmount(user);

        LeaderboardEntry memory entry = LeaderboardEntry({
            user: user,
            totalWins: totalWins,
            totalLoses: totalLoses,
            totalDraws: totalDraws,
            totalWpoinsWon: totalWpoinsWon,
            totalWpoinsLost: totalWpoinsLost,
            totalBetAmount: totalBetAmount,
            winrate: winrate,
            averageBetAmount: averageBetAmount
        });

        // Check if user already exists in the leaderboard
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i].user == user) {
                leaderboard[i] = entry;
                emit LeaderboardUpdated(user, entry);
                return;
            }
        }

        // If user does not exist, add a new entry
        leaderboard.push(entry);
        emit LeaderboardUpdated(user, entry);
    }

    // Get the top N players in the leaderboard
    function getTopPlayers(uint256 n) external view returns (LeaderboardEntry[] memory) {
        require(n <= leaderboard.length, "Requested number exceeds leaderboard size");

        LeaderboardEntry[] memory topPlayers = new LeaderboardEntry[](n);
        for (uint256 i = 0; i < n; i++) {
            topPlayers[i] = leaderboard[i];
        }
        return topPlayers;
    }

    // Get the leaderboard size
    function getLeaderboardSize() external view returns (uint256) {
        return leaderboard.length;
    }
}