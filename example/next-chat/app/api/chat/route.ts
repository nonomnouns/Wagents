import { NextResponse } from 'next/server';
import { Agent } from 'w-kits';
import { google } from 'w-kits/models';

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

const MAX_HISTORY_LENGTH = 10;
const chatHistory: string[] = [];
function addToHistory(message: string) {
    chatHistory.push(message); 
    if (chatHistory.length > MAX_HISTORY_LENGTH) {
        chatHistory.shift(); 
    }
}

function getHistory() {
    return chatHistory.join('\n');
}

export async function POST(request: Request) {
    const { message } = await request.json();
    addToHistory(`You: ${message}`);
    const context = getHistory();
    const prompt = `${context}\nAssistant:`;
    try {
        const { text } = await agent.generateText({
            prompt: prompt,
            toolChoice: 'auto',
            maxSteps: 10,
        });
        addToHistory(`Assistant: ${text}`);

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error('Error while generating response:', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}