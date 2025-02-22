"use client"

import { useState, useEffect } from "react"
import { Check, Copy, Sun, Moon, Monitor } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { toast } from "sonner"

interface ColorData {
  [key: string]: string
}

export default function ColorGrid() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [jsonInput, setJsonInput] = useState("")
  const [colorData, setColorData] = useState<ColorData>({})
  const [copyType, setCopyType] = useState<"name" | "value">("value")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const flattenColorObject = (obj: any, parentKey = ""): ColorData => {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return { ...acc, ...flattenColorObject(obj[key], newKey) }
      }
      return { ...acc, [newKey]: obj[key] }
    }, {})
  }

  const parseJsonInput = (input: string) => {
    try {
      const parsed = JSON.parse(input)
      if (typeof parsed === 'object' && parsed !== null) {
        const flattenedColors = flattenColorObject(parsed)
        setColorData(flattenedColors)
        toast.success("Colors loaded successfully!")
      } else {
        toast.error("Invalid JSON format. Please provide an object with color definitions.")
      }
    } catch (error) {
      toast.error("Invalid JSON. Please check your input.")
    }
  }

  const formatColorName = (name: string) => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/\./g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .trim()
  }

  const copyToClipboard = async (name: string, value: string) => {
    try {
      const textToCopy = copyType === "name" ? name : value
      await navigator.clipboard.writeText(textToCopy)
      setCopiedColor(value)
      toast.success(`Copied ${copyType}: ${textToCopy}`)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Color Palette Viewer</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("light")}
              className={cn(theme === "light" && "border-primary")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Light mode</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("dark")}
              className={cn(theme === "dark" && "border-primary")}
            >
              <Moon className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Dark mode</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("system")}
              className={cn(theme === "system" && "border-primary")}
            >
              <Monitor className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">System mode</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Textarea 
            placeholder="Paste your color JSON here..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="font-mono text-sm h-32"
          />
          <div className="flex gap-2">
            <Button onClick={() => parseJsonInput(jsonInput)}>
              Load Colors
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCopyType(copyType === "name" ? "value" : "name")}
            >
              Copy Mode: {copyType === "name" ? "Name" : "Value"}
            </Button>
          </div>
        </div>

        {Object.keys(colorData).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(colorData).map(([name, color]) => (
              <div
                key={name}
                className={cn(
                  "group relative bg-card rounded-lg overflow-hidden hover:shadow-md transition-all",
                  "cursor-pointer active:scale-95 transform border border-border"
                )}
                onClick={() => copyToClipboard(name, color)}
              >
                <div 
                  className="h-12"
                  style={{ 
                    backgroundColor: color,
                    backgroundImage: color === 'transparent' 
                      ? 'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)'
                      : undefined,
                    backgroundSize: color === 'transparent' ? '10px 10px' : undefined,
                    backgroundPosition: color === 'transparent' ? '0 0, 0 5px, 5px -5px, -5px 0px' : undefined
                  }}
                />
                <div className="p-2">
                  <div className="font-medium text-sm leading-tight truncate text-foreground">
                    {formatColorName(name)}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground truncate">
                    {color}
                  </div>
                </div>
                <div 
                  className={cn(
                    "absolute inset-0 bg-black/50 flex items-center justify-center",
                    "opacity-0 group-hover:opacity-100 transition-opacity",
                    copiedColor === color ? "opacity-100" : ""
                  )}
                >
                  {copiedColor === color ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <Copy className="h-5 w-5 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Paste your color JSON and click "Load Colors" to start
          </div>
        )}
      </div>
    </div>
  )
}

