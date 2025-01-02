"use client";
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function GenerateTextPage() {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    });
  };

  const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
    <Card className="relative mb-8">
      <CardContent className="p-0 overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10"
          onClick={() => copyToClipboard(code, id)}
          aria-label="Copy code"
        >
          {copiedStates[id] ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <SyntaxHighlighter 
          language={language} 
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            borderRadius: '0.5rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">generateText Method</h1>
        <p className="text-xl text-muted-foreground">
          The <code>generateText</code> method allows you to generate text using the AI model configured in your W-Kits Agent. This method provides a flexible way to interact with the AI, with support for various parameters and tools.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Method Signature</h2>
        <CodeBlock
          id="method-signature"
          language="typescript"
          code={`async generateText(options: {
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
  maxSteps?: number;
}): Promise<GenerateTextResult>`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Parameters</h2>
        <p className="text-lg text-muted-foreground">
          The <code>generateText</code> method accepts an options object with the following properties:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li><strong>prompt</strong> (optional): The input prompt for the AI model.</li>
          <li><strong>system</strong> (optional): A system message to set the behavior of the AI.</li>
          <li><strong>temperature</strong> (optional): Controls the randomness of the output (0 to 1).</li>
          <li><strong>maxTokens</strong> (optional): The maximum number of tokens to generate.</li>
          <li><strong>topP</strong> (optional): Nucleus sampling parameter (0 to 1).</li>
          <li><strong>topK</strong> (optional): Top-k sampling parameter.</li>
          <li><strong>presencePenalty</strong> (optional): Penalizes new tokens based on their presence in the text.</li>
          <li><strong>frequencyPenalty</strong> (optional): Penalizes new tokens based on their frequency in the text.</li>
          <li><strong>stopSequences</strong> (optional): Array of sequences that will stop the generation when encountered.</li>
          <li><strong>seed</strong> (optional): Seed for deterministic generation.</li>
          <li><strong>toolChoice</strong> (optional): Specifies how tools should be used (&apos;auto&apos;, &apos;none&apos;, &apos;required&apos;, or a specific tool).</li>
          <li><strong>maxSteps</strong> (optional): Maximum number of steps for multi-step generation.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Usage Example</h2>
        <p className="text-lg text-muted-foreground">
          Here&apos;s an example of how to use the <code>generateText</code> method:
        </p>
        <CodeBlock
          id="usage-example"
          language="typescript"
          code={`import { Agent } from 'w-kits';
import { google } from 'w-kits/models';

const agent = new Agent({
  model: google('gemini-2.0-flash-exp'),
  chain: 'testnet',
  privateKey: process.env.PRIVATE_KEY as \`0x\${string}\`,
});

async function generateResponse() {
  const result = await agent.generateText({
    prompt: "What's the current gas price on WhiteChain?",
    temperature: 0.7,
    maxTokens: 100,
    toolChoice: 'auto',
  });

  console.log(result.text);
  console.log(result.toolCalls);
  console.log(result.toolResults);
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Return Value</h2>
        <p className="text-lg text-muted-foreground">
          The <code>generateText</code> method returns a Promise that resolves to an object containing:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li><strong>text</strong>: The generated text response.</li>
          <li><strong>toolCalls</strong>: An array of tool calls made during the generation process.</li>
          <li><strong>toolResults</strong>: An array of results from the tool calls.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Best Practices</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li>Use clear and specific prompts to guide the AI&apos;s response.</li>
          <li>Experiment with different temperature settings to find the right balance between creativity and coherence.</li>
          <li>Utilize the toolChoice parameter to control when and how tools are used in the generation process.</li>
          <li>Consider using stopSequences to prevent the AI from generating unwanted content.</li>
          <li>For complex tasks, use the maxSteps parameter to allow for multi-step reasoning and tool usage.</li>
        </ul>
      </section>
    </div>
  );
}

