// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Wpoins.sol";
import "./Marketing.sol";

contract Game is Ownable {
    Wpoins public token;
    Marketing public marketing;

    enum Choice { Rock, Scissors, Paper }
    enum Result { Win, Lose, Draw }

    struct GameDetail {
        uint256 gameId;
        address user;
        Choice userChoice;
        Choice contractChoice;
        Result result;
        uint256 betAmount;
        uint256 timestamp;
    }

    mapping(address => uint256[]) public userGameIds;
    mapping(uint256 => GameDetail) public gameDetails;
    uint256 public gameCounter;

    mapping(address => uint256) public totalWins;
    mapping(address => uint256) public totalLoses;
    mapping(address => uint256) public totalDraws;
    mapping(address => uint256) public totalWpoinsWon;
    mapping(address => uint256) public totalWpoinsLost;
    mapping(address => uint256) public totalBetAmount;

    event BetPlaced(address indexed user, uint256 gameId, Choice userChoice, Choice contractChoice, Result result, uint256 betAmount);

    constructor(address _token, address _marketing) Ownable(msg.sender) {
        token = Wpoins(_token);
        marketing = Marketing(_marketing);
    }

    // User places a bet
    function placeBet(Choice userChoice, uint256 betAmount) external {
        require(betAmount > 0, "Bet amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), betAmount), "Bet failed");

        // Generate a random choice for the contract
        Choice contractChoice = Choice(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % 3);

        // Determine the result
        Result result = determineResult(userChoice, contractChoice);

        // Update user statistics
        if (result == Result.Win) {
            uint256 winAmount = betAmount * 2;
            totalWins[msg.sender] += 1;
            totalWpoinsWon[msg.sender] += winAmount;
            token.transfer(msg.sender, winAmount);

            // Reward referrer if any
            marketing.rewardReferrer(msg.sender, winAmount);
        } else if (result == Result.Lose) {
            totalLoses[msg.sender] += 1;
            totalWpoinsLost[msg.sender] += betAmount;
        } else {
            totalDraws[msg.sender] += 1;
            // Return 80% of the bet amount to the user
            uint256 returnAmount = betAmount * 80 / 100;
            token.transfer(msg.sender, returnAmount);
        }

        // Update total bet amount
        totalBetAmount[msg.sender] += betAmount;

        // Store game details
        gameCounter++;
        GameDetail memory newGame = GameDetail({
            gameId: gameCounter,
            user: msg.sender,
            userChoice: userChoice,
            contractChoice: contractChoice,
            result: result,
            betAmount: betAmount,
            timestamp: block.timestamp
        });

        gameDetails[gameCounter] = newGame;
        userGameIds[msg.sender].push(gameCounter);

        emit BetPlaced(msg.sender, gameCounter, userChoice, contractChoice, result, betAmount);
    }

    // Determine the game result
    function determineResult(Choice userChoice, Choice contractChoice) internal pure returns (Result) {
        if (userChoice == contractChoice) {
            return Result.Draw;
        } else if (
            (userChoice == Choice.Rock && contractChoice == Choice.Scissors) ||
            (userChoice == Choice.Paper && contractChoice == Choice.Rock) ||
            (userChoice == Choice.Scissors && contractChoice == Choice.Paper)
        ) {
            return Result.Win;
        } else {
            return Result.Lose;
        }
    }

    // Get game details by ID
    function getGameDetailById(uint256 gameId) external view returns (GameDetail memory) {
        return gameDetails[gameId];
    }

    // Get game details by user
    function getGameDetailByUser(address user) external view returns (GameDetail[] memory) {
        uint256[] memory ids = userGameIds[user];
        GameDetail[] memory details = new GameDetail[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            details[i] = gameDetails[ids[i]];
        }

        return details;
    }

    // Get total games played by a user
    function getTotalGames(address user) public view returns (uint256) {
        return totalWins[user] + totalLoses[user] + totalDraws[user];
    }

    // Calculate winrate for a user
    function calculateWinrate(address user) public view returns (uint256) {
        uint256 totalGames = totalWins[user] + totalLoses[user] + totalDraws[user];
        if (totalGames == 0) return 0;
        return (totalWins[user] * 100) / totalGames;
    }

    // Calculate average bet amount for a user
    function calculateAverageBetAmount(address user) public view returns (uint256) {
        uint256 totalGames = totalWins[user] + totalLoses[user] + totalDraws[user];
        if (totalGames == 0) return 0;
        return totalBetAmount[user] / totalGames;
    }

    // Get total bet amount for a user
    function getTotalBetAmount(address user) public view returns (uint256) {
        return totalBetAmount[user];
    }

    // Get total Wpoins won by a user
    function getTotalWpoinsWon(address user) public view returns (uint256) {
        return totalWpoinsWon[user];
    }

    // Get total Wpoins lost by a user
    function getTotalWpoinsLost(address user) public view returns (uint256) {
        return totalWpoinsLost[user];
    }
}