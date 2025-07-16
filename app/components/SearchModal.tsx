"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const mockProducts = [
  {
    id: "1",
    name: "Handwoven Ceramic Bowl",
    price: 45,
    image: "/images/ceramic-bowl.jpg",
    category: "Home Decor",
  },
  {
    id: "2",
    name: "Silver Artisan Necklace",
    price: 120,
    image: "/images/silver-necklace.jpg",
    category: "Jewelry",
  },
  {
    id: "3",
    name: "Embroidered Silk Scarf",
    price: 85,
    image: "/images/silk-scarf.jpg",
    category: "Clothing",
  },
  {
    id: "4",
    name: "Hand-carved Wooden Sculpture",
    price: 200,
    image: "/images/wooden-sculpture.jpg",
    category: "Art",
  },
]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(mockProducts)

  useEffect(() => {
    if (query) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults(mockProducts)
    }
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 animate-scale-in">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-lg"
              autoFocus
            />
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                {query ? "Search Results" : "Popular Products"}
              </h3>
              <div className="space-y-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-sm font-medium text-terracotta-600">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
