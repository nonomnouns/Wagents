import { z } from 'zod';
import { tool } from 'ai';
import { getWhitechainStats } from './whitechainStatsTool'; // Import the function
import { getWBTPrice } from './wbtPriceTool'; // Import the function

// Schema for gas price in USDT
const GasPriceSchema = z.object({
  gasPriceGwei: z.number().describe('The current gas price on Whitechain in Gwei'),
  gasPriceUSDT: z.number().describe('The gas price converted to USDT'),
});

// Function to get gas price in USDT
async function getGasPriceInUSDT() {
  try {
    // Fetch gas price in Gwei from Whitechain stats
    const { gasPriceGwei } = await getWhitechainStats(); // Call the function directly

    // Fetch WBT price in USDT
    const wbtUsdtPrice = await getWBTPrice(); // Call the function directly

    // Gas limit for a standard transaction (e.g., 21,000 for Ethereum)
    const gasLimit = 21000;

    // Calculate gas price in USDT
    const gasPriceUSDT = (gasPriceGwei * gasLimit * wbtUsdtPrice) / 1e9; // Convert Gwei to USDT

    return { gasPriceGwei, gasPriceUSDT };
  } catch (error) {
    console.error('Failed to fetch gas price in USDT:', error);
    throw new Error('Failed to fetch gas price in USDT');
  }
}

// Create the gas price tool
export const gasPriceTool = tool({
  description: 'Fetch the current gas price on Whitechain and convert it to USDT using the WBT/USDT price.',
  parameters: z.object({}), // No parameters needed
  execute: async () => {
    const { gasPriceGwei, gasPriceUSDT } = await getGasPriceInUSDT();
    return {
      gasPriceGwei,
      gasPriceUSDT,
      formattedResponse: `The current gas price is ${gasPriceGwei.toFixed(2)} Gwei, which results in a transaction fee of approximately $${gasPriceUSDT.toFixed(6)} USDT.`,
    };
  },
});