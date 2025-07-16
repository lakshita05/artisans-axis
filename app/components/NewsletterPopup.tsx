"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Mail, Gift } from "lucide-react"

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    // Show popup after 5 seconds if not already shown
    const hasShown = localStorage.getItem("newsletter-popup-shown")
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("newsletter-popup-shown", "true")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        handleClose()
      }, 2000)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in relative overflow-hidden">
        {/* Close Button */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
          <X className="w-6 h-6" />
        </button>

        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-sage-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

        <div className="relative p-8">
          {!isSubscribed ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-terracotta-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Get 15% Off Your First Order!</h2>
                <p className="text-gray-600">
                  Join our newsletter and be the first to know about new arrivals, exclusive offers, and artisan
                  stories.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-terracotta-500 text-white py-3 rounded-lg hover:bg-terracotta-600 transition-colors font-medium"
                >
                  Get My 15% Off Code
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </>
          ) : (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to the family!</h3>
              <p className="text-gray-600">Check your email for your 15% off code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
