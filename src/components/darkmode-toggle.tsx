"use client"

import { Sun, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export default function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <Button
      className="group"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Moon className="h-4 w-4 transition-all duration-300 ease-in-out rotate-0 hover:-rotate-12" />
      ) : (
        <Sun className="h-4 w-4 transition-all duration-300 ease-in-out rotate-0 hover:rotate-90" />
      )}
    </Button>
  )
}
