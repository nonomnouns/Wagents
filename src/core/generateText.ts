import { generateText as aiGenerateText, streamText as aiStreamText } from 'ai';

// Generate text using the AI SDK
export async function generateText(options: {
    model: any;
    system?: string;
    prompt: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    topK?: number;
    presencePenalty?: number;
    frequencyPenalty?: number;
    stopSequences?: string[];
    seed?: number;
    tools?: Record<string, any>;
    toolChoice?: 'auto' | 'none' | 'required' | { type: 'tool'; toolName: string };
    maxSteps?: number; // Maximum number of steps for multi-step generation
}) {
    return aiGenerateText({
        model: options.model,
        system: options.system,
        prompt: options.prompt,
        temperature: options.temperature,
        maxTokens: options.maxTokens,
        topP: options.topP,
        topK: options.topK,
        presencePenalty: options.presencePenalty,
        frequencyPenalty: options.frequencyPenalty,
        stopSequences: options.stopSequences,
        seed: options.seed,
        tools: options.tools,
        toolChoice: options.toolChoice,
        maxSteps: options.maxSteps, // Pass max steps to the AI SDK
    });
}

// Stream text using the AI SDK
export function streamText(options: {
    model: any;
    system?: string;
    prompt: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    topK?: number;
    presencePenalty?: number;
    frequencyPenalty?: number;
    stopSequences?: string[];
    seed?: number;
    tools?: Record<string, any>;
    toolChoice?: 'auto' | 'none' | 'required' | { type: 'tool'; toolName: string };
    maxSteps?: number; // Maximum number of steps for multi-step generation
}) {
    return aiStreamText({
        model: options.model,
        system: options.system,
        prompt: options.prompt,
        temperature: options.temperature,
        maxTokens: options.maxTokens,
        topP: options.topP,
        topK: options.topK,
        presencePenalty: options.presencePenalty,
        frequencyPenalty: options.frequencyPenalty,
        stopSequences: options.stopSequences,
        seed: options.seed,
        tools: options.tools,
        toolChoice: options.toolChoice,
        maxSteps: options.maxSteps, // Pass max steps to the AI SDK
    });
}