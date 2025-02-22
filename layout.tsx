import "@/styles/globals.css"
import { ThemeProvider } from "./providers"
import { Toaster } from "sonner"

export const metadata = {
  title: "JSON Color APH",
  description: "A simple tool to visualize and copy colors from JSON data",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

