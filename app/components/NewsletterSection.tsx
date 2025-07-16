"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Check } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-16 bg-terracotta-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <Mail className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Stay Connected</h2>
          <p className="text-xl text-terracotta-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and artisan
            stories.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-terracotta-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-terracotta-100 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          ) : (
            <div className="animate-scale-in">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
                <Check className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Thank you!</h3>
                <p className="text-terracotta-100">You've successfully subscribed to our newsletter.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
