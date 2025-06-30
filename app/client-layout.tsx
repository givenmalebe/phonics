"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Effect to monitor localStorage changes (for sign-in detection)
  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem("user")
      if (user) {
        // User just signed in, force sidebar to open
        document.cookie = "sidebar_state=; path=/; max-age=0"
        setTimeout(() => {
          setSidebarOpen(true)
          document.cookie = "sidebar_state=true; path=/; max-age=" + (60 * 60 * 24 * 7)
        }, 0)
      }
    }

    // Listen for storage events (cross-tab changes)
    window.addEventListener('storage', handleStorageChange)

    // Also check periodically for same-tab changes
    const interval = setInterval(() => {
      const user = localStorage.getItem("user")
      const nowAuthenticated = !!user

      if (nowAuthenticated !== isAuthenticated) {
        setIsAuthenticated(nowAuthenticated)
        if (nowAuthenticated) {
          // User just signed in - clear cookie first, then force sidebar open
          document.cookie = "sidebar_state=; path=/; max-age=0"
          setTimeout(() => {
            setSidebarOpen(true)
            document.cookie = "sidebar_state=true; path=/; max-age=" + (60 * 60 * 24 * 7)
          }, 0)
        }
      }
    }, 100) // Check every 100ms

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [isAuthenticated])

  // Initial authentication check
  useEffect(() => {
    const user = localStorage.getItem("user")
    const nowAuthenticated = !!user

    setIsAuthenticated(nowAuthenticated)
    setIsLoading(false)

    // If user is authenticated on initial load, ensure sidebar is open
    if (nowAuthenticated) {
      // Clear any existing sidebar cookie first, then set it to true
      document.cookie = "sidebar_state=; path=/; max-age=0"
      setTimeout(() => {
        setSidebarOpen(true)
        document.cookie = "sidebar_state=true; path=/; max-age=" + (60 * 60 * 24 * 7)
      }, 0)
    }
  }, [])

  // Show landing page for unauthenticated users or on landing route
  if (pathname === "/landing" || (!isAuthenticated && !isLoading)) {
    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </body>
      </html>
    )
  }

  // Show authenticated app
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <AppSidebar />
          <main className="flex-1">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  )
}
