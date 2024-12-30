import { createSendNativeTokenTool, createSendTokenTool , gasPriceTool, whitechainStatsTool, wbtPriceTool, wbtBalanceTool} from './tools';
import { generateText, streamText } from './core/generateText';

export class Agent {
    private model: any; // The language model to use
    private systemPrompt?: string; // System prompt for the model
    private prompt?: string; // Default prompt for the model
    private options: any; // Additional options for text generation
    private tools: Record<string, any>; // Tools that the model can call
    private maxSteps: number; // Maximum number of steps for multi-step generation
    private chain: 'mainnet' | 'testnet'; // Chain configuration
    private privateKey: `0x${string}`; // Private key for signing transactions
    private tokenList: Record<string, { address: `0x${string}`; symbol: string; decimals: number }>; // List of tokens

    constructor(config: {
        model: any; // Language model (e.g., google('gemini-2.0-flash-exp'))
        systemPrompt?: string; // System prompt
        prompt?: string; // Default prompt
        options?: {
            temperature?: number; // Controls randomness (0 = deterministic, 1 = creative)
            maxTokens?: number; // Maximum number of tokens to generate
            topP?: number; // Nucleus sampling (0.0 to 1.0)
            topK?: number; // Top-k sampling (1 to infinity)
            presencePenalty?: number; // Penalizes new tokens based on whether they appear in the text
            frequencyPenalty?: number; // Penalizes new tokens based on their frequency in the text
            stopSequences?: string[]; // Sequences that stop the generation
            seed?: number; // Seed for deterministic output
            toolChoice?: 'auto' | 'none' | 'required' | { type: 'tool'; toolName: string }; // Tool choice setting
        };
        tools?: Record<string, any>; // Tools that the model can call
        maxSteps?: number; // Maximum number of steps for multi-step generation
        chain: 'mainnet' | 'testnet'; // Chain configuration
        privateKey: `0x${string}`; // Private key for signing transactions
        tokenList?: Record<string, { address: `0x${string}`; symbol: string; decimals: number }>; // List of tokens
    }) {
        this.model = config.model;
        this.systemPrompt = config.systemPrompt;
        this.prompt = config.prompt;
        this.options = config.options || {};
        this.tools = config.tools || {};
        this.maxSteps = config.maxSteps || 1; // Default to 1 step if not provided
        this.chain = config.chain; // Set chain
        this.privateKey = config.privateKey; // Set private key
        this.tokenList = config.tokenList || {}; // Set token list

        // Automatically add the sendNativeToken and sendToken tools
        this.tools.sendNativeToken = createSendNativeTokenTool(this.chain, this.privateKey);
        this.tools.sendToken = createSendTokenTool(this.chain, this.privateKey, this.tokenList);
        this.tools.gasPrice = gasPriceTool;
        this.tools.whitechainStats = whitechainStatsTool;
        this.tools.wbtPrice = wbtPriceTool;
        this.tools.wbtBalance = wbtBalanceTool;
    }

    // Method to add a token to the token list
    addToken(symbol: string, address: `0x${string}`, decimals: number) {
        this.tokenList[symbol] = { address, symbol, decimals };
    }

    // Method to get token information by symbol
    getToken(symbol: string) {
        return this.tokenList[symbol];
    }

    // Generate text using the model
    async generateText(options: {
        prompt?: string;
        system?: string;
        temperature?: number;
        maxTokens?: number;
        topP?: number;
        topK?: number;
        presencePenalty?: number;
        frequencyPenalty?: number;
        stopSequences?: string[];
        seed?: number;
        toolChoice?: 'auto' | 'none' | 'required' | { type: 'tool'; toolName: string };
        maxSteps?: number; // Override max steps for this call
    }) {
        return generateText({
            model: this.model,
            system: this.systemPrompt || options.system,
            prompt: options.prompt || this.prompt || '',
            temperature: options.temperature ?? this.options.temperature,
            maxTokens: options.maxTokens ?? this.options.maxTokens,
            topP: options.topP ?? this.options.topP,
            topK: options.topK ?? this.options.topK,
            presencePenalty: options.presencePenalty ?? this.options.presencePenalty,
            frequencyPenalty: options.frequencyPenalty ?? this.options.frequencyPenalty,
            stopSequences: options.stopSequences ?? this.options.stopSequences,
            seed: options.seed ?? this.options.seed,
            tools: this.tools,
            toolChoice: options.toolChoice ?? this.options.toolChoice,
            maxSteps: options.maxSteps ?? this.maxSteps, // Use provided max steps or default
        });
    }

    // Stream text using the model
    streamText(options: {
        prompt?: string;
        system?: string;
        temperature?: number;
        maxTokens?: number;
        topP?: number;
        topK?: number;
        presencePenalty?: number;
        frequencyPenalty?: number;
        stopSequences?: string[];
        seed?: number;
        toolChoice?: 'auto' | 'none' | 'required' | { type: 'tool'; toolName: string };
        maxSteps?: number; // Override max steps for this call
    }) {
        return streamText({
            model: this.model,
            system: this.systemPrompt || options.system,
            prompt: options.prompt || this.prompt || '',
            temperature: options.temperature ?? this.options.temperature,
            maxTokens: options.maxTokens ?? this.options.maxTokens,
            topP: options.topP ?? this.options.topP,
            topK: options.topK ?? this.options.topK,
            presencePenalty: options.presencePenalty ?? this.options.presencePenalty,
            frequencyPenalty: options.frequencyPenalty ?? this.options.frequencyPenalty,
            stopSequences: options.stopSequences ?? this.options.stopSequences,
            seed: options.seed ?? this.options.seed,
            tools: this.tools,
            toolChoice: options.toolChoice ?? this.options.toolChoice,
            maxSteps: options.maxSteps ?? this.maxSteps, // Use provided max steps or default
        });
    }
}