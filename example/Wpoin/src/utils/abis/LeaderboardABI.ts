export const leaderboardABI = {
    // Constructor
    constructor: [
      {
        inputs: [
          { internalType: "address", name: "_game", type: "address" }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      }
    ] as const,
  
    // Errors
    errors: [
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" }
        ],
        name: "OwnableInvalidOwner",
        type: "error"
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" }
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error"
      }
    ] as const,
  
    // Events
    events: [
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "user", type: "address" },
          {
            components: [
              { internalType: "address", name: "user", type: "address" },
              { internalType: "uint256", name: "totalWins", type: "uint256" },
              { internalType: "uint256", name: "totalLoses", type: "uint256" },
              { internalType: "uint256", name: "totalDraws", type: "uint256" },
              { internalType: "uint256", name: "totalWpoinsWon", type: "uint256" },
              { internalType: "uint256", name: "totalWpoinsLost", type: "uint256" },
              { internalType: "uint256", name: "totalBetAmount", type: "uint256" },
              { internalType: "uint256", name: "winrate", type: "uint256" },
              { internalType: "uint256", name: "averageBetAmount", type: "uint256" }
            ],
            indexed: false,
            internalType: "struct Leaderboard.LeaderboardEntry",
            name: "entry",
            type: "tuple"
          }
        ],
        name: "LeaderboardUpdated",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
          { indexed: true, internalType: "address", name: "newOwner", type: "address" }
        ],
        name: "OwnershipTransferred",
        type: "event"
      }
    ] as const,
  
    // Read Functions
    read: [
      {
        inputs: [],
        name: "game",
        outputs: [
          { internalType: "contract Game", name: "", type: "address" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "getLeaderboardSize",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "uint256", name: "n", type: "uint256" }
        ],
        name: "getTopPlayers",
        outputs: [
          {
            components: [
              { internalType: "address", name: "user", type: "address" },
              { internalType: "uint256", name: "totalWins", type: "uint256" },
              { internalType: "uint256", name: "totalLoses", type: "uint256" },
              { internalType: "uint256", name: "totalDraws", type: "uint256" },
              { internalType: "uint256", name: "totalWpoinsWon", type: "uint256" },
              { internalType: "uint256", name: "totalWpoinsLost", type: "uint256" },
              { internalType: "uint256", name: "totalBetAmount", type: "uint256" },
              { internalType: "uint256", name: "winrate", type: "uint256" },
              { internalType: "uint256", name: "averageBetAmount", type: "uint256" }
            ],
            internalType: "struct Leaderboard.LeaderboardEntry[]",
            name: "",
            type: "tuple[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        name: "leaderboard",
        outputs: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "totalWins", type: "uint256" },
          { internalType: "uint256", name: "totalLoses", type: "uint256" },
          { internalType: "uint256", name: "totalDraws", type: "uint256" },
          { internalType: "uint256", name: "totalWpoinsWon", type: "uint256" },
          { internalType: "uint256", name: "totalWpoinsLost", type: "uint256" },
          { internalType: "uint256", name: "totalBetAmount", type: "uint256" },
          { internalType: "uint256", name: "winrate", type: "uint256" },
          { internalType: "uint256", name: "averageBetAmount", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          { internalType: "address", name: "", type: "address" }
        ],
        stateMutability: "view",
        type: "function"
      }
    ] as const,
  
    // Write Functions
    write: [
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" }
        ],
        name: "updateLeaderboard",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ] as const
  };