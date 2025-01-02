"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function GroqModelsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Groq Models</h1>
        <p className="text-xl text-muted-foreground">
          W-Kits supports Groq&apos;s high-performance models. Import and use these models in your AI agents for different capabilities.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Environment Setup</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertDescription>
            You need to set up your Groq API key as an environment variable:
            <code className="ml-2 px-2 py-1 bg-muted rounded">GROQ_API_KEY=xxxxxxxxx</code>
          </AlertDescription>
        </Alert>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Import and Usage</h2>
        <Card>
          <CardContent className="p-6">
            <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
              {`import { groq } from 'w-kits/models';

const agent = new Agent({
  model: groq('llama-3.3-70b-versatile'),
  // ... other configuration
});`}
            </SyntaxHighlighter>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Model Capabilities</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Model</TableHead>
              <TableHead>Image Input</TableHead>
              <TableHead>Object Generation</TableHead>
              <TableHead>Tool Usage</TableHead>
              <TableHead>Tool Streaming</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">llama-3.3-70b-versatile</TableCell>
              <TableCell><X className="h-4 w-4 text-gray-300" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">llama-3.1-8b-instant</TableCell>
              <TableCell><X className="h-4 w-4 text-gray-300" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">gemma2-9b-it</TableCell>
              <TableCell><X className="h-4 w-4 text-gray-300" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">mixtral-8x7b-32768</TableCell>
              <TableCell><X className="h-4 w-4 text-gray-300" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

