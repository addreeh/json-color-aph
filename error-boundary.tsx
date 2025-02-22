"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground">
              There was an error loading the color viewer. Please check your color data and try again.
            </p>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

