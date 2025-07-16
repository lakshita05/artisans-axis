"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    text: "The quality of the handcrafted jewelry I received was absolutely stunning. You can really feel the love and care that went into making each piece.",
    image: "/images/testimonial-sarah.jpg",
    product: "Silver Artisan Necklace",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    text: "I've been searching for unique home decor pieces, and this store exceeded my expectations. The ceramic bowl is now the centerpiece of my dining table.",
    image: "/images/testimonial-michael.jpg",
    product: "Handwoven Ceramic Bowl",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Austin, TX",
    rating: 5,
    text: "Supporting artisans while getting beautiful, one-of-a-kind pieces feels amazing. The customer service was exceptional too!",
    image: "/images/testimonial-emma.jpg",
    product: "Embroidered Silk Scarf",
  },
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600">Real stories from people who love our handcrafted products</p>
        </div>

        <div className="relative">
          <div className="bg-cream-50 rounded-2xl p-8 md:p-12 shadow-lg">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === currentTestimonial ? "opacity-100" : "opacity-0 absolute inset-0 p-8 md:p-12"
                }`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-gray-700 font-medium mb-8 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.location}</div>
                      <div className="text-sm text-terracotta-600 mt-1">Purchased: {testimonial.product}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-terracotta-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
