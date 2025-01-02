const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy Wpoins Token
    const Wpoins = await hre.ethers.getContractFactory("Wpoins");
    const wpoins = await Wpoins.deploy();
    await wpoins.waitForDeployment(); // Menunggu hingga kontrak benar-benar ter-deploy
    console.log("Wpoins deployed to:", wpoins.target);

    // Deploy Marketing
    const Marketing = await hre.ethers.getContractFactory("Marketing");
    const marketing = await Marketing.deploy(wpoins.target);
    await marketing.waitForDeployment();
    console.log("Marketing deployed to:", marketing.target);

    // Deploy Game
    const Game = await hre.ethers.getContractFactory("Game");
    const game = await Game.deploy(wpoins.target, marketing.target);
    await game.waitForDeployment();
    console.log("Game deployed to:", game.target);

    // Deploy Leaderboard
    const Leaderboard = await hre.ethers.getContractFactory("Leaderboard");
    const leaderboard = await Leaderboard.deploy(game.target);
    await leaderboard.waitForDeployment();
    console.log("Leaderboard deployed to:", leaderboard.target);

    // Deploy Staking
    const Staking = await hre.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(wpoins.target);
    await staking.waitForDeployment();
    console.log("Staking deployed to:", staking.target);

    // Deploy Dex
    const Dex = await hre.ethers.getContractFactory("Dex");
    const dex = await Dex.deploy(wpoins.target);
    await dex.waitForDeployment();
    console.log("Dex deployed to:", dex.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });