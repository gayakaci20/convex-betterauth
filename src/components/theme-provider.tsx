"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  isDark: false,
  setTheme: () => null,
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    const root = window.document.documentElement

    // Get initial theme from localStorage or system preference
    const stored = localStorage.getItem(storageKey) as Theme
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    const initialTheme = stored || (systemPrefersDark ? "dark" : "light")
    setTheme(initialTheme)
    
    // Apply theme
    root.classList.remove("light", "dark")
    
    if (initialTheme === "system") {
      const systemTheme = systemPrefersDark ? "dark" : "light"
      root.classList.add(systemTheme)
      setIsDark(systemTheme === "dark")
    } else {
      root.classList.add(initialTheme)
      setIsDark(initialTheme === "dark")
    }
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      setIsDark(systemTheme === "dark")
    } else {
      root.classList.add(theme)
      setIsDark(theme === "dark")
    }

    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("dark")
    } else {
      // If system, toggle based on current state
      setTheme(isDark ? "light" : "dark")
    }
  }

  const value = {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
