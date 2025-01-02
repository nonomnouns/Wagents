"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Home, BookOpen, Code, Settings, Layers, Zap, Menu } from 'lucide-react'

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Sidebar</SheetTitle>
        <SidebarContent />
      </SheetContent>
      <div className="hidden lg:block w-64">
        <SidebarContent />
      </div>
    </Sheet>
  )
}

function SidebarContent() {
  return (
    <div className="h-full p-4 bg-gray-50 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <BookOpen className="mr-2 h-5 w-5" />
        Documentation
      </h2>
      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Introduction
          </Link>
        </Button>
        <h3 className="text-sm font-semibold mt-4 mb-2 flex items-center">
          <Zap className="mr-2 h-4 w-4" />
          Agents
        </h3>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs/agents/getting-started" className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Getting Started
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs/agents/generate-text" className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Generate Text
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs/agents/tools" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Tools
          </Link>
        </Button>
        <h3 className="text-sm font-semibold mt-4 mb-2 flex items-center">
          <Layers className="mr-2 h-4 w-4" />
          Models
        </h3>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs/agents/models/google" className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Google
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs/agents/models/openai" className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            OpenAI
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs/agents/models/groq" className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Groq
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs/agents/models/mistral" className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Mistral
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs/agents/reference" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Reference
          </Link>
        </Button>
        <h3 className="text-sm font-semibold mt-4 mb-2 flex items-center">
          <Settings className="mr-2 h-4 w-4" />
          UI
        </h3>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/docs/ui/coming-soon" className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Coming Soon
          </Link>
        </Button>
      </nav>
    </div>
  )
}