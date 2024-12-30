import { whiteClient } from '../clients/walletClient'; // Use whiteClient for Whitechain
import { z } from 'zod';
import { tool } from 'ai';
import { getWBTPrice } from './wbtPriceTool'; // Import function to get WBT price

// Schema for balance details
const WBTBalanceSchema = z.object({
  walletAddress: z.string().describe('The address of the wallet'),
  wbtBalance: z.string().describe('The balance of the native token (WBT)'),
  wbtBalanceInWBT: z.number().describe('The balance of WBT in WBT (not Wei)'),
  wbtPriceUSD: z.number().describe('The price of WBT in USD'),
  wbtValueUSD: z.number().describe('The value of WBT balance in USD'),
});

// Function to fetch native token balance (WBT)
async function getWBTBalance(walletAddress: `0x${string}`) {
  try {
    const balance = await whiteClient.getBalance({ address: walletAddress });
    return balance.toString(); // Convert balance to string
  } catch (error) {
    console.error('Failed to fetch WBT balance:', error);
    throw new Error('Failed to fetch WBT balance');
  }
}

// Create the WBT balance checker tool
export const wbtBalanceTool = tool({
  description: 'Fetch the balance of native token (WBT) and calculate its value in USD.',
  parameters: z.object({
    walletAddress: z.string().describe('The address of the wallet to check'),
  }),
  execute: async ({ walletAddress }) => {
    const [wbtBalance, wbtPriceUSD] = await Promise.all([
      getWBTBalance(walletAddress as `0x${string}`), // Fetch WBT balance
      getWBTPrice(), // Fetch WBT price in USD
    ]);

    // Convert balance from Wei to WBT
    const wbtBalanceInWBT = Number(wbtBalance) / 1e18;

    // Calculate the value of WBT balance in USD
    const wbtValueUSD = wbtBalanceInWBT * wbtPriceUSD;

    return {
      walletAddress,
      wbtBalance,
      wbtBalanceInWBT,
      wbtPriceUSD,
      wbtValueUSD,
      formattedResponse: `WBT Balance for Wallet ${walletAddress}:\n` +
        `- WBT Balance: ${wbtBalanceInWBT.toFixed(4)} WBT\n` +
        `- WBT Price: $${wbtPriceUSD.toFixed(2)} USD\n` +
        `- WBT Value: $${wbtValueUSD.toFixed(2)} USD`,
    };
  },
});