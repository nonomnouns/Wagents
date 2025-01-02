export const marketingABI = {
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
          { indexed: false, internalType: "string", name: "username", type: "string" },
          { indexed: false, internalType: "string", name: "avatar", type: "string" },
          { indexed: false, internalType: "string", name: "referralCode", type: "string" }
        ],
        name: "ReferralRegistered",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "user", type: "address" },
          { indexed: false, internalType: "string", name: "referralCode", type: "string" },
          { indexed: true, internalType: "address", name: "referrer", type: "address" }
        ],
        name: "ReferralUsed",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "referrer", type: "address" },
          { indexed: true, internalType: "address", name: "referee", type: "address" },
          { indexed: false, internalType: "uint256", name: "reward", type: "uint256" }
        ],
        name: "ReferrerReward",
        type: "event"
      }
    ] as const,
  
    // Read Functions
    read: [
      {
        inputs: [],
        name: "REFERRAL_REGISTRATION_REWARD",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "REFERRER_REWARD",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "REFERRER_WIN_SHARE",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { internalType: "string", name: "", type: "string" }
        ],
        name: "codeToUser",
        outputs: [
          { internalType: "address", name: "", type: "address" }
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
        name: "users",
        outputs: [
          { internalType: "string", name: "username", type: "string" },
          { internalType: "string", name: "avatar", type: "string" },
          { internalType: "string", name: "referralCode", type: "string" },
          { internalType: "uint256", name: "referralCount", type: "uint256" },
          { internalType: "uint256", name: "totalReferralEarnings", type: "uint256" },
          { internalType: "uint256", name: "totalReferralWins", type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      }
    ] as const,
  
    // Write Functions
    write: [
      {
        inputs: [
          { internalType: "string", name: "username", type: "string" },
          { internalType: "string", name: "avatar", type: "string" },
          { internalType: "string", name: "referralCode", type: "string" }
        ],
        name: "register",
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
          { internalType: "address", name: "referee", type: "address" },
          { internalType: "uint256", name: "winAmount", type: "uint256" }
        ],
        name: "rewardReferrer",
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