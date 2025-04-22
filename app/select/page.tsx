"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Instagram, Facebook, Youtube, TextIcon as Telegram, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// Platform data
const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "from-pink-500 to-purple-600",
    services: ["Followers", "Likes", "Views", "Comments"],
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "from-blue-500 to-blue-700",
    services: ["Page Likes", "Followers", "Post Likes", "Post Shares"],
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "from-red-500 to-red-700",
    services: ["Subscribers", "Views", "Likes", "Comments"],
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Telegram,
    color: "from-blue-400 to-blue-600",
    services: ["Channel Members", "Post Views", "Reactions"],
  },
]

export default function SelectService() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [quantity, setQuantity] = useState(1000)
  const [total, setTotal] = useState(0.5)

  // Initialize from URL params if available
  useEffect(() => {
    const platform = searchParams.get("platform")
    if (platform && platforms.some((p) => p.id === platform)) {
      setSelectedPlatform(platform)
      // Set default service for the platform
      const platformData = platforms.find((p) => p.id === platform)
      if (platformData && platformData.services.length > 0) {
        setSelectedService(platformData.services[0])
      }
    }
  }, [searchParams])

  // Calculate total when quantity changes
  useEffect(() => {
    // Price calculation: 1K = $0.5
    setTotal((quantity / 1000) * 0.5)
  }, [quantity])

  // Handle platform change
  const handlePlatformChange = (value: string) => {
    setSelectedPlatform(value)
    // Reset service when platform changes
    const platformData = platforms.find((p) => p.id === value)
    if (platformData && platformData.services.length > 0) {
      setSelectedService(platformData.services[0])
    } else {
      setSelectedService("")
    }
  }

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    } else {
      setQuantity(1000) // Default to 1000 if invalid
    }
  }

  // Handle buy now button
  const handleBuyNow = () => {
    if (selectedPlatform && selectedService && quantity > 0) {
      const queryParams = new URLSearchParams({
        platform: selectedPlatform,
        service: selectedService,
        quantity: quantity.toString(),
        total: total.toString(),
      }).toString()

      router.push(`/payment?${queryParams}`)
    }
  }

  // Get current platform data
  const currentPlatform = platforms.find((p) => p.id === selectedPlatform)

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeIn}>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Select Your Service</h1>
        <p className="text-xl mb-8 text-muted-foreground text-center">
          Choose a platform, service, and quantity to get started.
        </p>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Service Selection</CardTitle>
            <CardDescription>Configure your social media boosting service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Platform Selection */}
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={selectedPlatform} onValueChange={handlePlatformChange}>
                <SelectTrigger id="platform" className="w-full">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      <div className="flex items-center">
                        <platform.icon className="h-4 w-4 mr-2" />
                        {platform.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Selection - Only show if platform is selected */}
            {selectedPlatform && (
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger id="service" className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentPlatform?.services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity Input */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1000"
                step="1000"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <p className="text-sm text-muted-foreground">Minimum order: 1,000 | Price: $0.5 per 1,000</p>
            </div>

            {/* Price Calculation */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Total Price:</span>
                </div>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleBuyNow}
              className="w-full"
              size="lg"
              disabled={!selectedPlatform || !selectedService || quantity < 1000}
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>

        {/* Platform Preview - Show if platform is selected */}
        {selectedPlatform && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className={`bg-gradient-to-br ${currentPlatform?.color} text-white`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center">
                    {currentPlatform && <currentPlatform.icon className="h-6 w-6" />}
                  </div>
                  <div>
                    <CardTitle>{currentPlatform?.name}</CardTitle>
                    <CardDescription className="text-white/70">
                      Boost your {currentPlatform?.name} presence
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Our {currentPlatform?.name} boosting services help you grow your audience and increase engagement.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {currentPlatform?.services.map((service) => (
                    <div key={service} className="flex items-center space-x-2 bg-white/10 p-2 rounded">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
