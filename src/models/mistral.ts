import { mistral as aiMistral } from '@ai-sdk/mistral';

export function mistral(modelName: string) {
    return aiMistral(modelName);
}