import { Agent } from './src/agent';
import { google } from './src/models/google';

// Create an agent with the Google model, chain, private key, and token list
const agent = new Agent({
    model: google('gemini-2.0-flash-exp'),
    systemPrompt: 'You are a helpful assistant. try debug eror ',
    chain: 'testnet', // Use testnet
    privateKey: '0xd920ddb2d071e8f4925ac8b5ac40bcec368f37267b001e0401d21b9dad030a3d', // Replace with your private key
    tokenList: {
        WPN: {
            address: '0x619114eE16B57b43237153C585d5FAbd20e4EBfA', // Replace with the WPN contract address
            symbol: 'WPN',
            decimals: 18,
        },
       
    },

});

// Generate text and call the sendToken tool
const { text, toolCalls, toolResults } = await agent.generateText({
    prompt: 'Send 1000 WPN to 0xd8dA6BF26964aF9D7eEd9e03E53415D3. ', // Replace with a valid address
    toolChoice: 'auto', // Force the model to use the tool
    maxSteps: 10,
});

console.log(text); // The generated text
