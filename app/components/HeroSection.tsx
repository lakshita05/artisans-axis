"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Handcrafted with Love",
    subtitle: "Discover Unique Artisan Creations",
    description: "Each piece tells a story of tradition, skill, and passion passed down through generations.",
    image: "/images/hero-1.jpg",
    cta: "Shop Collection",
  },
  {
    id: 2,
    title: "Sustainable & Ethical",
    subtitle: "Supporting Local Artisans",
    description: "Every purchase directly supports skilled craftspeople and their communities worldwide.",
    image: "/images/hero-2.jpg",
    cta: "Learn More",
  },
  {
    id: 3,
    title: "Limited Edition Pieces",
    subtitle: "One-of-a-Kind Treasures",
    description: "Own something truly special with our exclusive handmade collections.",
    image: "/images/hero-3.jpg",
    cta: "Explore Now",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden hero-gradient">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="grid lg:grid-cols-2 h-full items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-6 animate-slide-up">
                <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">{slide.title}</h1>
                <h2 className="text-2xl lg:text-3xl text-terracotta-600 font-medium">{slide.subtitle}</h2>
                <p className="text-lg text-gray-700 max-w-lg">{slide.description}</p>
                <div className="flex space-x-4">
                  <Link
                    href="/products"
                    className="bg-terracotta-500 text-white px-8 py-3 rounded-lg hover:bg-terracotta-600 transition-all duration-300 transform hover:scale-105 font-medium"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/about"
                    className="border-2 border-terracotta-500 text-terracotta-600 px-8 py-3 rounded-lg hover:bg-terracotta-500 hover:text-white transition-all duration-300 font-medium"
                  >
                    Our Story
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block animate-scale-in">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl object-cover"
                  priority={index === currentSlide}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-terracotta-500" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
