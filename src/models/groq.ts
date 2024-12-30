import { groq as aiGroq } from '@ai-sdk/groq';


export function groq(modelName: string) {
    return aiGroq(modelName);
}