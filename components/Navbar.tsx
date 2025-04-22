"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            SocialBoost
          </span>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        ) : (
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/select" className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <Button asChild>
                <Link href="/select">Get Started</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="container mx-auto px-4 pb-4 pt-2">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/select"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#testimonials"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Button asChild className="w-full">
              <Link href="/select" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
