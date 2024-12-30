import { Agent } from './src/agent';
import { google } from './src/models/google';

// Create an agent with the Google model, chain, and private key
const agent = new Agent({
    model: google('gemini-2.0-flash-exp'),
    systemPrompt: 'You are a helpful assistant if send eror try to help debug.',
    chain: 'testnet', // Use testnet
    privateKey: '0xd920ddb2d071e8f4925ac8b5ac40bcec368f37267b001e0401d21b9dad030a3d', 
    
});

// Generate text and call the sendNativeToken tool
const { text, toolCalls, toolResults } = await agent.generateText({
    prompt: 'Send 0.001 WBT to 0xd8dA6BF26964aF9D7eEd9e03E534045.', // Ganti dengan alamat yang valid
    toolChoice: 'auto', // Force the model to use the tool
    maxSteps: 10,
});


console.log(text); // The generated text
