import { createWallet, createPublic, erc20Abi } from '../clients/walletClient';
import { z } from 'zod';
import { isAddress } from 'viem'; // Untuk validasi alamat

// Function to convert token amount to the smallest unit (e.g., 1 USDT = 10^6 units)
function tokenToUnits(amount: string, decimals: number): bigint {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) {
        throw new Error('Invalid token amount. Please provide a valid number.');
    }
    return BigInt(amountValue * 10 ** decimals);
}

export function createSendTokenTool(chain: 'mainnet' | 'testnet', privateKey: `0x${string}`, tokenList: Record<string, { address: `0x${string}`; symbol: string; decimals: number }>) {
    const walletClient = createWallet(chain, privateKey);
    const publicClient = createPublic(chain);

    return {
        name: 'sendToken',
        description: 'Send ERC-20 tokens to a specified address. Input value should be in token units (e.g., 1 USDT).',
        parameters: z.object({
            tokenSymbol: z.string().describe('The symbol of the token (e.g., USDT, WPN).'),
            to: z.string().describe('The recipient address.'),
            value: z.string().describe('The amount of tokens to send (e.g., 1 USDT).'),
        }),
        execute: async ({ tokenSymbol, to, value }: { tokenSymbol: string; to: `0x${string}`; value: string }) => {
            try {
                console.log('Fetching token address for symbol:', tokenSymbol);

                // Resolve the token address from the tokenList
                const token = tokenList[tokenSymbol];
                if (!token) {
                    return {
                        status: 'error',
                        error: `Token ${tokenSymbol} not found in the token list.`,
                    };
                }

                const { address, decimals } = token;
                console.log('Token address:', address);

                // Convert the token amount to the smallest unit
                let valueInUnits: bigint;
                try {
                    valueInUnits = tokenToUnits(value, decimals);
                } catch (error) {
                    return {
                        status: 'error',
                        error: error instanceof Error ? error.message : 'Invalid token amount.',
                    };
                }
                console.log('Converted value to units:', valueInUnits.toString());

                // Fetch the sender's balance
                console.log('Fetching balance from contract...');
                let balance: bigint;
                try {
                    balance = await publicClient.readContract({
                        address,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [walletClient.account.address],
                    }) as bigint;
                } catch (error) {
                    return {
                        status: 'error',
                        error: error instanceof Error ? error.message : 'Failed to fetch balance.',
                    };
                }
                console.log('Balance fetched:', balance.toString());

                if (balance < valueInUnits) {
                    return {
                        status: 'error',
                        error: 'Insufficient token balance.',
                    };
                }

                // Send the token
                console.log('Sending token...');
                let txHash: `0x${string}`;
                try {
                    txHash = await walletClient.writeContract({
                        address,
                        abi: erc20Abi,
                        functionName: 'transfer',
                        args: [to, valueInUnits],
                    });
                } catch (error) {
                    return {
                        status: 'error',
                        error: error instanceof Error ? error.message : 'Failed to send token.',
                    };
                }
                console.log('Transaction hash:', txHash);

                // Wait for the transaction to be confirmed
                console.log('Waiting for transaction confirmation...');
                let receipt;
                try {
                    receipt = await publicClient.waitForTransactionReceipt({
                        hash: txHash,
                    });
                } catch (error) {
                    return {
                        status: 'error',
                        error: error instanceof Error ? error.message : 'Failed to wait for transaction receipt.',
                    };
                }

                // Check the transaction status
                if (receipt.status === 'success') {
                    console.log('Transaction successful.');
                    return { 
                        txHash,
                        blockExplorerUrl: `https://testnet.whitechain.io/tx/${txHash}`,
                        status: 'success',
                    };
                } else {
                    return {
                        status: 'failed',
                        txHash,
                        blockExplorerUrl: `https://testnet.whitechain.io/tx/${txHash}`,
                        error: 'Transaction failed. Check the block explorer for details.',
                    };
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                return {
                    status: 'error',
                    error: error instanceof Error ? error.message : 'An unexpected error occurred.',
                };
            }
        },
    };
}