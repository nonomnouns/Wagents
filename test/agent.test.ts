import { Agent } from "../dist";
import {google} from "../dist/models"

const agent = new Agent({
    model: google('gemini-2.0-flash-exp'), 
    chain: 'testnet',
    privateKey: process.env.PRIVATE_KEY as `0x${string}`, 
    tokenList: {
        WPN: {
            address: '0x619114eE16B57b43237153C585d5FAbd20e4EBfA',
            symbol: 'WPN',
            decimals: 18,
        },
    },
});
const { text } = await agent.generateText({
    prompt: 'get price now   ', 
    toolChoice: 'auto', 
    maxSteps:10
});

console.log(text); 