import { createWalletClient, createPublicClient, http, defineChain } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import {mainnet} from 'viem/chains'
// Define Whitechain and Whitechain Testnet
export const whitechain = defineChain({
    id: 1875,
    name: 'Whitechain',
    nativeCurrency: { name: 'WBT', symbol: 'WBT', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.whitechain.io'] },
    },
    blockExplorers: {
        default: { name: 'Whitechain Explorer', url: 'http://explorer.whitechain.io' },
    },
});

export const whitechainTest = defineChain({
    id: 2625,
    name: 'Whitechain Testnet',
    nativeCurrency: { name: 'WBT', symbol: 'WBT', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc-testnet.whitechain.io'] },
    },
    blockExplorers: {
        default: { name: 'Whitechain Testnet Explorer', url: 'https://testnet.whitechain.io' },
    },
});

// Create a wallet client
export function createWallet(chain: 'mainnet' | 'testnet', privateKey: `0x${string}`) {
    const selectedChain = chain === 'mainnet' ? whitechain : whitechainTest;
    const account = privateKeyToAccount(privateKey);

    return createWalletClient({
        chain: selectedChain,
        transport: http(),
        account,
    });
}

// Create a public client
export function createPublic(chain: 'mainnet' | 'testnet') {
    const selectedChain = chain === 'mainnet' ? whitechain : whitechainTest;

    return createPublicClient({
        chain: selectedChain,
        transport: http(),
    });
}

// ABI untuk kontrak ERC-20
export const erc20Abi = [
    // Fungsi balanceOf
    {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
    },
    // Fungsi decimals
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
    },
    // Fungsi transfer
    {
        constant: false,
        inputs: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
    },
] as const;



export const whiteClient = createPublicClient({ 
  chain: whitechain,
  transport: http()
})

export const whiteClientTest = createPublicClient({ 
  chain: whitechainTest,
  transport: http()
})


export const ethClient = createPublicClient({ 
    chain: mainnet,
    transport: http('https://eth.llamarpc.com')
  })

