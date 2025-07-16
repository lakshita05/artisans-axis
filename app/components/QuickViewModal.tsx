"use client"

import { useState } from "react"
import { X, Heart, ShoppingBag, Star, Minus, Plus, Zap } from "lucide-react"
import Image from "next/image"
import { useCart } from "../context/CartContext"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating: number
  reviews: number
  badge?: string
  description: string
  inStock: boolean
  stockCount: number
}

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  if (!isOpen || !product) return null

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          category: product.category,
        },
      })
    }
  }

  const buyNow = () => {
    addToCart()
    onClose()
    // Navigate to checkout
    window.location.href = "/checkout"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Quick View</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-terracotta-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-terracotta-500" : "hover:opacity-75"
                    } transition-all`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-terracotta-600 font-medium">{product.category}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 text-sm font-medium rounded">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`font-medium ${product.inStock ? "text-green-700" : "text-red-700"}`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Buy Now Button - Prominent */}
              <button
                onClick={buyNow}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white py-4 px-6 rounded-xl hover:from-terracotta-600 hover:to-terracotta-700 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <Zap className="w-6 h-6" />
                <span>Buy Now - ${(product.price * quantity).toFixed(2)}</span>
              </button>

              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="flex items-center justify-center space-x-2 bg-white border-2 border-terracotta-500 text-terracotta-600 py-3 px-4 rounded-lg hover:bg-terracotta-50 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>

                <button className="flex items-center justify-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 font-medium">
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Handcrafted by skilled artisans</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
