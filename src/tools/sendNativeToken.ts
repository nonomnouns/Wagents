import { createWallet, createPublic, whitechain, whitechainTest } from '../clients/walletClient';
import { z } from 'zod';
import { isAddress } from 'viem'; // Use address validation function from viem

// Function to convert WBT to wei
function wbtToWei(wbt: string): bigint {
    const wbtValue = parseFloat(wbt);
    if (isNaN(wbtValue)) {
        throw new Error('Invalid WBT value. Please provide a valid number.');
    }
    return BigInt(wbtValue * 1e18); // 1 WBT = 10^18 wei
}

export function createSendNativeTokenTool(chain: 'mainnet' | 'testnet', privateKey: `0x${string}`) {
    const walletClient = createWallet(chain, privateKey);
    const publicClient = createPublic(chain);

    return {
        name: 'sendNativeToken',
        description: 'Send native WBT tokens to a specified address. Input value should be in WBT (e.g., 0.1 WBT).',
        parameters: z.object({
            to: z.string().describe('The recipient address.'),
            value: z.string().describe('The amount of WBT to send (e.g., 0.1 WBT).'),
        }),
        execute: async ({ to, value }: { to: `0x${string}`; value: string }) => {
            try {
                // Validate recipient address
                if (!isAddress(to)) {
                    return {
                        status: 'error',
                        error: 'Invalid recipient address. Please provide a valid Ethereum address.',
                    };
                }

                // Convert WBT value to wei
                let valueInWei: bigint;
                try {
                    valueInWei = wbtToWei(value);
                } catch (error) {
                    return {
                        status: 'error',
                        error: error instanceof Error ? error.message : 'Invalid WBT value.',
                    };
                }

                // Pastikan walletClient.account tidak undefined
                if (!walletClient.account) {
                    return {
                        status: 'error',
                        error: 'Wallet account is undefined. Please check your wallet configuration.',
                    };
                }

                // Dynamically calculate gas limit
                let gasEstimate: bigint;
                try {
                    gasEstimate = await publicClient.estimateGas({
                        account: walletClient.account,
                        to,
                        value: valueInWei,
                    });
                } catch (error) {
                    return {
                        status: 'error',
                        error: error instanceof Error ? error.message : 'Failed to estimate gas.',
                    };
                }

                // Send transaction
                let txHash: `0x${string}`;
                try {
                    txHash = await walletClient.sendTransaction({
                        to,
                        value: valueInWei,
                        chain: chain === 'mainnet' ? whitechain : whitechainTest,
                        gas: gasEstimate,
                        account: walletClient.account, // Tambahkan parameter account
                    });
                } catch (error) {
                    return {
                        status: 'error',
                        error: error instanceof Error ? error.message : 'Failed to send transaction.',
                    };
                }

                // Wait for transaction confirmation
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

                // Check transaction status
                if (receipt.status === 'success') {
                    return {
                        txHash,
                        blockExplorerUrl: `https://testnet.whitechain.io/tx/${txHash}`,
                        status: 'success',
                    };
                } else {
                    return {
                        txHash,
                        blockExplorerUrl: `https://testnet.whitechain.io/tx/${txHash}`,
                        status: 'failed',
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