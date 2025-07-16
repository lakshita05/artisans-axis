"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Star, Minus, Plus, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "../../context/CartContext"
import ReviewsSection from "../../components/ReviewsSection"
import { products } from "../../data/products"

// Replace the existing product object with:
const product = products.find((p) => p.id === "1") || products[0]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const { dispatch } = useCart()

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

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-terracotta-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-terracotta-500" : "hover:opacity-75"
                  } transition-all`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
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

              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 text-sm font-medium rounded">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
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
                <span className="text-sm text-gray-600">{product.stockCount} in stock</span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-terracotta-500 text-white px-6 py-3 rounded-lg hover:bg-terracotta-600 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>

                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </button>

                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-terracotta-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Truck className="w-6 h-6 text-terracotta-500" />
                <div>
                  <div className="font-medium text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-600">On orders over $50</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Shield className="w-6 h-6 text-terracotta-500" />
                <div>
                  <div className="font-medium text-sm">Secure Payment</div>
                  <div className="text-xs text-gray-600">SSL encrypted</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <RotateCcw className="w-6 h-6 text-terracotta-500" />
                <div>
                  <div className="font-medium text-sm">Easy Returns</div>
                  <div className="text-xs text-gray-600">30-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? "border-terracotta-500 text-terracotta-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                <p className="text-gray-700 leading-relaxed">
                  Each piece is carefully crafted using traditional techniques that have been perfected over centuries.
                  The artisans who create these beautiful bowls take pride in their work, ensuring that every detail
                  meets the highest standards of quality and craftsmanship.
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && <ReviewsSection productId={product.id} />}
          </div>
        </div>
      </div>
    </div>
  )
}
