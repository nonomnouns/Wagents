import { google as aiGoogle } from '@ai-sdk/google';

export function google(modelName: string) {
    return aiGoogle(modelName);
}