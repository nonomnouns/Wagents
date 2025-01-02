'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github } from 'lucide-react'

const codeSnippets = [
  `import { Agent } from 'w-kits';
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
});

const { text } = await agent.generateText({
    prompt: 'get price now', 
    toolChoice: 'auto', 
    maxSteps: 10
});

console.log(text);`,

  `// Send tokens using the agent
await agent.generateText({
    prompt: 'send 10 WBT (native) to 0x1234567890abcdef1234567890abcdef12345678',
    toolChoice: 'required',
    maxSteps: 5
});`,

  `// Get data from WhiteChain
await agent.generateText({
    prompt: 'get data on WhiteChain',
    toolChoice: 'auto',
    maxSteps: 3
});`
];

export default function HomePage() {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    let isCancelled = false;
    const animateCode = async () => {
      const snippet = codeSnippets[currentSnippetIndex];
      for (let i = 0; i <= snippet.length; i++) {
        if (isCancelled) break;
        setDisplayedCode(snippet.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (!isCancelled) {
        setCurrentSnippetIndex((prevIndex) => (prevIndex + 1) % codeSnippets.length);
      }
    };
    animateCode();
    return () => {
      isCancelled = true;
    };
  }, [currentSnippetIndex]);

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 font-bold text-2xl text-[#0A0928]">
              Wkits
            </div>
            <div className="flex space-x-4">
              <Link href="https://github.com/nonomnouns/Wkits" target="_blank">
                <Button variant="ghost" size="sm">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="ghost" size="sm" className="text-base">
                  Docs
                </Button>
              </Link>
              <Link href="/playground">
                <Button variant="ghost" size="sm" className="text-base">
                  Playground
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold tracking-tight text-[#0A0928] lg:text-6xl">
              Connect any AI Agents to WhiteChain
            </h1>
            <p className="text-xl text-gray-600">
              Build and deploy AI agents onchain with our powerful toolkit and intuitive UI components.
            </p>
            <div className="flex gap-4">
              <Link href="/docs">
                <Button className="bg-[#0265FF] hover:bg-[#0265FF]/90">
                  Get Started
                </Button>
              </Link>
              <Link href="https://github.com/nonomnouns/Wkits">
                <Button variant="outline" className="border-[#0A0928]">
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg bg-[#0A0928] p-4 text-white font-mono relative overflow-hidden shadow-[0_0_15px_rgba(2,101,255,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0265FF]/20 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <pre className="text-sm">
                <code className="block h-[300px] overflow-hidden whitespace-pre-wrap">
                  {displayedCode.split('\n').map((line, index) => (
                    <span key={index} className="block">
                      {line.split(' ').map((word, wordIndex) => {
                        if (word.startsWith("import") || word === "const" || word === "await") {
                          return <span key={wordIndex} className="text-purple-400">{word} </span>;
                        } else if (word.startsWith("'") || word.startsWith('"')) {
                          return <span key={wordIndex} className="text-green-300">{word} </span>;
                        } else if (word.includes("(") || word.includes(")") || word.includes("{") || word.includes("}")) {
                          return <span key={wordIndex} className="text-yellow-300">{word} </span>;
                        } else if (word.includes(".")) {
                          return <span key={wordIndex} className="text-blue-300">{word} </span>;
                        } else {
                          return <span key={wordIndex}>{word} </span>;
                        }
                      })}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow hover:border-[#0265FF] hover:bg-[#0265FF]/10">
            <h3 className="text-xl font-bold text-[#0A0928] mb-4">Create AI Agents</h3>
            <p className="text-gray-600">Deploy and manage AI agents directly on WhiteChain with our simple toolkit.</p>
          </div>
          <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow hover:border-[#0265FF] hover:bg-[#0265FF]/10">
            <h3 className="text-xl font-bold text-[#0A0928] mb-4">Interactive UI</h3>
            <p className="text-gray-600">Beautiful and responsive UI components for interacting with WhiteChain.</p>
          </div>
          <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow hover:border-[#0265FF] hover:bg-[#0265FF]/10">
            <h3 className="text-xl font-bold text-[#0A0928] mb-4">Easy Integration</h3>
            <p className="text-gray-600">Seamlessly integrate with existing blockchain infrastructure and AI models.</p>
          </div>
        </div>
      </div>
    </div>
  );
}