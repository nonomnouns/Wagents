import { ethClient } from '../clients/walletClient'; // Use whiteClient for Whitechain
import { parseAbi } from 'viem';
import { z } from 'zod';
import { tool } from 'ai';

// Pool address and ABI
const poolAddress = '0xa47caceff117ae0a889b13a920e1e9cd2279bae0';
const poolAbi = parseAbi([
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
]);

// WBT address
const wbtAddress = '0x925206b8a707096ed26ae47c84747fe0bb734f59';

// Schema for WBT price
const WBTPriceSchema = z.object({
  wbtUsdtPrice: z.number().describe('The current price of WBT in USDT'),
});

// Function to get WBT price
export async function getWBTPrice(): Promise<number> {
  try {
    const [reserves, token0] = await Promise.all([
      ethClient.readContract({
        address: poolAddress,
        abi: poolAbi,
        functionName: 'getReserves',
      }),
      ethClient.readContract({
        address: poolAddress,
        abi: poolAbi,
        functionName: 'token0',
      }),
    ]);

    const [reserve0, reserve1] = reserves;

    let wbtReserve, otherReserve;
    if (token0.toLowerCase() === wbtAddress.toLowerCase()) {
      wbtReserve = Number(reserve0) / 1e8; // WBT has 8 decimals
      otherReserve = Number(reserve1) / 1e6; // USDT has 6 decimals
    } else {
      wbtReserve = Number(reserve1) / 1e8; // WBT has 8 decimals
      otherReserve = Number(reserve0) / 1e6; // USDT has 6 decimals
    }

    // Calculate WBT price
    return otherReserve / wbtReserve;
  } catch (error) {
    console.error('Failed to fetch WBT price:', error);
    throw new Error('Failed to fetch WBT price');
  }
}

// Create the WBT price tool
export const wbtPriceTool = tool({
  description: 'Fetch the current price of WBT in USDT from a decentralized exchange.',
  parameters: z.object({}), // No parameters needed
  execute: async () => {
    const wbtUsdtPrice = await getWBTPrice();
    return {
      wbtUsdtPrice: wbtUsdtPrice,
      formattedResponse: `The current price of WBT is $${wbtUsdtPrice.toFixed(2)} USDT.`,
    };
  },
});