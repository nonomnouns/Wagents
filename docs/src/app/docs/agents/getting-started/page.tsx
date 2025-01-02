"use client";
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent,  } from '@/components/ui/card';

export default function GettingStartedPage() {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [selectedPackageManager, setSelectedPackageManager] = useState<string>('npm');

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

  const installationCommands = {
    npm: 'npm install w-kits',
    yarn: 'yarn add w-kits',
    pnpm: 'pnpm add w-kits',
    bun: 'bun add w-kits',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Getting Started with Agents</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to set up and use AI Agents in W-Kits to interact with WhiteChain. Follow the steps below to create your first agent and start building decentralized applications powered by AI.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Installation</h2>
        <p className="text-lg text-muted-foreground">
          First, install the W-Kits package using your preferred package manager:
        </p>
        <div className="flex space-x-2 mb-4">
          {Object.keys(installationCommands).map((manager) => (
            <Button
              key={manager}
              variant={selectedPackageManager === manager ? "default" : "outline"}
              onClick={() => setSelectedPackageManager(manager)}
            >
              {manager}
            </Button>
          ))}
        </div>
        <CodeBlock
          id="installation"
          language="bash"
          code={installationCommands[selectedPackageManager as keyof typeof installationCommands]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Create Your First Agent</h2>
        <p className="text-lg text-muted-foreground">
          Once installed, you can create an AI Agent by importing the necessary modules and configuring it with your preferred model and blockchain settings. Here&apos;s an example:
        </p>
        <CodeBlock
          id="create-agent"
          language="typescript"
          code={`import { Agent } from 'w-kits';
import { google } from 'w-kits/models';

const agent = new Agent({
  model: google('gemini-2.0-flash-exp'),
  chain: 'testnet',
  privateKey: process.env.PRIVATE_KEY as \`0x\${string}\`,
  tokenList: {
    WPN: {
      address: '0x619114eE16B57b43237153C585d5FAbd20e4EBfA',
      symbol: 'WPN',
      decimals: 18,
    },
  },
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Using the Agent</h2>
        <p className="text-lg text-muted-foreground">
          Once your agent is initialized, you can use it to interact with WhiteChain. Here are some common methods:
        </p>
        <CodeBlock
          id="using-agent"
          language="typescript"
          code={`// Add a new token to the agent's token list
agent.addToken('WPN', '0x619114eE16B57b43237153C585d5FAbd20e4EBfA', 18);

// Get token information
const tokenInfo = agent.getToken('WPN');

// Generate text using the agent
const response = await agent.generateText({
  prompt: 'What is the current gas price on WhiteChain?',
  temperature: 0.7,
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Next Steps</h2>
        <p className="text-lg text-muted-foreground">
          Now that your agent is set up, you can start using it to interact with WhiteChain. Explore the documentation to learn more about advanced features like sending transactions, querying data, and integrating with dApps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
        </div>
      </section>
    </div>
  );
}

