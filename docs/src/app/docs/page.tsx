"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Puzzle } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Introduction to W-Kits</h1>
        <p className="text-xl text-muted-foreground">
          W-Kits is a comprehensive toolkit designed to bridge the gap between AI and blockchain technology. Build, deploy, and manage AI agents on WhiteChain with ease.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Create AI Agents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Deploy and manage AI agents directly on WhiteChain. Perfect for chatbots, automated trading bots, or AI-powered dApps.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Interactive UI</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Beautiful and responsive UI components for wallet connection, token sending, swapping, and more. Enhance user experience and simplify blockchain interactions.
            </p>
            <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Puzzle className="w-5 h-5 text-primary" />
              <span>Easy Integration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Seamlessly integrate with existing blockchain infrastructure and AI models. Ensure a smooth and efficient integration process for developers and businesses alike.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">What is an AI Agent?</h2>
        <p className="text-lg text-muted-foreground">
          An AI Agent in W-Kits is a smart, autonomous entity that can interact with WhiteChain and perform tasks such as sending transactions, querying data, or executing complex workflows. These agents are powered by advanced language models and can be customized to suit your specific needs.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">UI Components</h2>
        <p className="text-lg text-muted-foreground">
          W-Kits will soon introduce a suite of UI components to make blockchain interactions more intuitive and user-friendly. Here&apos;s a sneak peek at what&apos;s coming:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li><strong>Connect Wallet:</strong> A simple and secure way for users to connect their wallets to your dApp.</li>
          <li><strong>Send Components:</strong> Easily send tokens or native assets with a clean and user-friendly interface.</li>
          <li><strong>Swap Components:</strong> Enable token swaps directly within your application.</li>
          <li><strong>Transaction History:</strong> Display a user&apos;s transaction history in a clear and organized manner.</li>
        </ul>
        <Badge variant="secondary">Coming Soon</Badge>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Why Choose W-Kits?</h2>
        <p className="text-lg text-muted-foreground">
          W-Kits is designed to empower developers and businesses to harness the full potential of AI and blockchain. With its easy-to-use tools, robust features, and seamless integration capabilities, W-Kits is the ultimate solution for building the next generation of decentralized applications.
        </p>
      </section>
    </div>
  );
}

