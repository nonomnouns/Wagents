require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY } = process.env;

module.exports = {
    solidity: "0.8.20",
    networks: {
        whitechain: {
            url: "https://rpc-testnet.whitechain.io",
            chainId: 2625, 
            accounts: [PRIVATE_KEY], 
        },
    },
    customChains: [
        {
            network: "whitechain",
            chainId: 2625,
            urls: {
                apiURL: "https://testnet.whitechain.io/api", 
                browserURL: "https://testnet.whitechain.io",
            },
        },
    ],
};