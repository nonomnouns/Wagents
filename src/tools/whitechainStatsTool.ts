import { whiteClient } from '../clients/walletClient'; // Gunakan whiteClient untuk Whitechain
import { z } from 'zod';
import { tool } from 'ai';

// Schema for Whitechain stats
const WhitechainStatsSchema = z.object({
  gasPriceGwei: z.number().describe('The current gas price on Whitechain in Gwei'),
  lastFinalizedBlock: z.number().describe('The latest finalized block number on Whitechain'),
  transactionsInLastBlock: z.number().describe('The number of transactions in the last finalized block'),
});

// Function to get Whitechain stats
export async function getWhitechainStats() { // Export the function
  try {
    const gasPrice = await whiteClient.getGasPrice();
    const gasPriceGwei = Number(gasPrice) / 1e9;

    const block = await whiteClient.getBlock();
    const lastFinalizedBlock = Number(block.number);
    const transactionsInLastBlock = block.transactions.length;

    return { gasPriceGwei, lastFinalizedBlock, transactionsInLastBlock };
  } catch (error) {
    console.error('Failed to fetch Whitechain stats:', error);
    throw new Error('Failed to fetch Whitechain stats');
  }
}

// Create the Whitechain stats tool
export const whitechainStatsTool = tool({
  description: 'Fetch the latest statistics for the Whitechain network, including gas price, last finalized block, and transactions in the last block.',
  parameters: z.object({}), // No parameters needed
  execute: async () => await getWhitechainStats(),
});