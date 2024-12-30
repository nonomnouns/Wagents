import { openai as aiOpenAI } from '@ai-sdk/openai';

export function openai(modelName: string) {
    return aiOpenAI(modelName);
}