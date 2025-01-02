import { defineChain } from 'viem';

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