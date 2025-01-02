export const dexABI = {
    // Constructor
    constructor: [
      {
        inputs: [
          { internalType: "address", name: "_token", type: "address" }
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
          { indexed: false, internalType: "uint256", name: "wbtAmount", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "wpoinsAmount", type: "uint256" }
        ],
        name: "LiquidityAdded",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "user", type: "address" },
          { indexed: false, internalType: "uint256", name: "wbtAmount", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "wpoinsAmount", type: "uint256" }
        ],
        name: "LiquidityRemoved",
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
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "user", type: "address" },
          { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "cost", type: "uint256" }
        ],
        name: "TokensPurchased",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "user", type: "address" },
          { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "revenue", type: "uint256" }
        ],
        name: "TokensSold",
        type: "event"
      }
    ] as const,
  
    // Read Functions
    read: [
      {
        inputs: [],
        name: "buyFee",
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
        name: "liquidityProviderShares",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
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
        name: "sellFee",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "token",
        outputs: [
          { internalType: "contract IERC20", name: "", type: "address" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "totalWBTInContract",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "totalWpoinsInContract",
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
          { internalType: "uint256", name: "wbtAmount", type: "uint256" },
          { internalType: "uint256", name: "wpoinsAmount", type: "uint256" }
        ],
        name: "addLiquidity",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          { internalType: "uint256", name: "newBuyFee", type: "uint256" },
          { internalType: "uint256", name: "newSellFee", type: "uint256" }
        ],
        name: "adjustFees",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [],
        name: "buyTokens",
        outputs: [],
        stateMutability: "payable",
        type: "function"
      },
      {
        inputs: [
          { internalType: "uint256", name: "shares", type: "uint256" }
        ],
        name: "removeLiquidity",
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
          { internalType: "uint256", name: "tokenAmount", type: "uint256" }
        ],
        name: "sellTokens",
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