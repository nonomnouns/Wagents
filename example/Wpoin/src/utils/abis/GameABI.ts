export const gameABI = {
    // Constructor
    constructor: [
      {
        inputs: [
          { internalType: "address", name: "_token", type: "address" },
          { internalType: "address", name: "_marketing", type: "address" }
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
          { indexed: false, internalType: "uint256", name: "gameId", type: "uint256" },
          { indexed: false, internalType: "enum Game.Choice", name: "userChoice", type: "uint8" },
          { indexed: false, internalType: "enum Game.Choice", name: "contractChoice", type: "uint8" },
          { indexed: false, internalType: "enum Game.Result", name: "result", type: "uint8" },
          { indexed: false, internalType: "uint256", name: "betAmount", type: "uint256" }
        ],
        name: "BetPlaced",
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
        inputs: [
          { internalType: "address", name: "user", type: "address" }
        ],
        name: "calculateAverageBetAmount",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" }
        ],
        name: "calculateWinrate",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "gameCounter",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        name: "gameDetails",
        outputs: [
          { internalType: "uint256", name: "gameId", type: "uint256" },
          { internalType: "address", name: "user", type: "address" },
          { internalType: "enum Game.Choice", name: "userChoice", type: "uint8" },
          { internalType: "enum Game.Choice", name: "contractChoice", type: "uint8" },
          { internalType: "enum Game.Result", name: "result", type: "uint8" },
          { internalType: "uint256", name: "betAmount", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "uint256", name: "gameId", type: "uint256" }
        ],
        name: "getGameDetailById",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "gameId", type: "uint256" },
              { internalType: "address", name: "user", type: "address" },
              { internalType: "enum Game.Choice", name: "userChoice", type: "uint8" },
              { internalType: "enum Game.Choice", name: "contractChoice", type: "uint8" },
              { internalType: "enum Game.Result", name: "result", type: "uint8" },
              { internalType: "uint256", name: "betAmount", type: "uint256" },
              { internalType: "uint256", name: "timestamp", type: "uint256" }
            ],
            internalType: "struct Game.GameDetail",
            name: "",
            type: "tuple"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" }
        ],
        name: "getGameDetailByUser",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "gameId", type: "uint256" },
              { internalType: "address", name: "user", type: "address" },
              { internalType: "enum Game.Choice", name: "userChoice", type: "uint8" },
              { internalType: "enum Game.Choice", name: "contractChoice", type: "uint8" },
              { internalType: "enum Game.Result", name: "result", type: "uint8" },
              { internalType: "uint256", name: "betAmount", type: "uint256" },
              { internalType: "uint256", name: "timestamp", type: "uint256" }
            ],
            internalType: "struct Game.GameDetail[]",
            name: "",
            type: "tuple[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" }
        ],
        name: "getTotalBetAmount",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" }
        ],
        name: "getTotalGames",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" }
        ],
        name: "getTotalWpoinsLost",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" }
        ],
        name: "getTotalWpoinsWon",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "marketing",
        outputs: [
          { internalType: "contract Marketing", name: "", type: "address" }
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
      },
      {
        inputs: [],
        name: "token",
        outputs: [
          { internalType: "contract Wpoins", name: "", type: "address" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" }
        ],
        name: "totalBetAmount",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" }
        ],
        name: "totalDraws",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" }
        ],
        name: "totalLoses",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" }
        ],
        name: "totalWins",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" }
        ],
        name: "totalWpoinsLost",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" }
        ],
        name: "totalWpoinsWon",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        name: "userGameIds",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      }
    ] as const,
  
    // Write Functions
    write: [
      {
        inputs: [
          { internalType: "enum Game.Choice", name: "userChoice", type: "uint8" },
          { internalType: "uint256", name: "betAmount", type: "uint256" }
        ],
        name: "placeBet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
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
      }
    ] as const
  };