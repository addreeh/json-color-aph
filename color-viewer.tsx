"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ColorData {
  [key: string]: string
}

export default function ColorViewer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [colorData, setColorData] = useState<ColorData>({
    backdrop: "rgba(46, 48, 56, 0.4)",
    background: "#FEFBFF",
    "elevation.level0": "transparent",
    "elevation.level1": "#F5F3FA",
    "elevation.level2": "#EFEEF6",
    "elevation.level3": "#EAEAF3",
    "elevation.level4": "#E8E8F2",
    "elevation.level5": "#E4E5F0",
    error: "#BA1A1A",
    errorContainer: "#FFDAD6",
    inverseOnSurface: "#F1F0F7",
    inversePrimary: "#B0C6FF",
    inverseSurface: "#2F3036",
    onBackground: "#1A1B20",
    onError: "#FFFFFF",
    onErrorContainer: "#410002",
    onPrimary: "#FFFFFF",
    onPrimaryContainer: "#001945",
    onSecondary: "#FFFFFF",
    onSecondaryContainer: "#151B2C",
    onSurface: "#1A1B20",
    onSurfaceDisabled: "rgba(26, 27, 32, 0.38)",
    onSurfaceVariant: "#44464F",
    onTertiary: "#FFFFFF",
    onTertiaryContainer: "#2A122C",
    outline: "#757780",
    outlineVariant: "#C5C6D0",
    primary: "#475D92",
    primaryContainer: "#D9E2FF",
    scrim: "#000000",
    secondary: "#575E71",
    secondaryContainer: "#DCE2F9",
    shadow: "#000000",
    surface: "#FEFBFF",
    surfaceBright: "#FBF8FD",
    surfaceContainer: "#EFEDF1",
    surfaceContainerHigh: "#E9E7EC",
    surfaceContainerHighest: "#E3E2E6",
    surfaceContainerLow: "#F5F3F7",
    surfaceContainerLowest: "#FFFFFF",
    surfaceDim: "#DBD9DD",
    surfaceDisabled: "rgba(26, 27, 32, 0.12)",
    surfaceTint: "#475D92",
    surfaceVariant: "#E1E2EC",
    tertiary: "#725572",
    tertiaryContainer: "#FDD7FA",
  })

  const colorEntries = Object.entries(colorData)
  const totalColors = colorEntries.length

  const formatColorName = (name: string) => {
    return name
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/\./g, " ") // Replace dots with spaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .trim()
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalColors - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalColors - 1 ? prev + 1 : 0))
  }

  const [currentName, currentValue] = colorEntries[currentIndex]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-2xl p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Color Viewer</h1>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} of {totalColors}
          </div>
        </div>

        <div className="space-y-6">
          <div
            className="w-full aspect-video rounded-lg shadow-inner"
            style={{
              backgroundColor: currentValue,
              backgroundImage:
                currentValue === "transparent"
                  ? "linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)"
                  : undefined,
              backgroundSize: currentValue === "transparent" ? "20px 20px" : undefined,
              backgroundPosition: currentValue === "transparent" ? "0 0, 0 10px, 10px -10px, -10px 0px" : undefined,
            }}
          />

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{formatColorName(currentName)}</h2>
            <p className="font-mono text-muted-foreground">{currentValue}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} className="flex items-center gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

