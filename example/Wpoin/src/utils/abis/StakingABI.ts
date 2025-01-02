export const stakingABI = {
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
          { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
        ],
        name: "Staked",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "user", type: "address" },
          { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "reward", type: "uint256" }
        ],
        name: "Unstaked",
        type: "event"
      }
    ] as const,
  
    // Read Functions
    read: [
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" }
        ],
        name: "calculateReward",
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
        name: "getStakingRate",
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
        inputs: [
          { internalType: "address", name: "", type: "address" }
        ],
        name: "stakingBalances",
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
        name: "stakingStartTimes",
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
        name: "stakingTiers",
        outputs: [
          { internalType: "uint256", name: "minAmount", type: "uint256" },
          { internalType: "uint256", name: "rewardRate", type: "uint256" }
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
      }
    ] as const,
  
    // Write Functions
    write: [
      {
        inputs: [
          { internalType: "uint256", name: "minAmount", type: "uint256" },
          { internalType: "uint256", name: "rewardRate", type: "uint256" }
        ],
        name: "addStakingTier",
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
          { internalType: "uint256", name: "amount", type: "uint256" }
        ],
        name: "stake",
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
        inputs: [],
        name: "unstake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ] as const
  };