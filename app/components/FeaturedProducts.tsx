"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { useCart } from "../context/CartContext"
import QuickViewModal from "./QuickViewModal"
import { products } from "../data/products"

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all")
  const { dispatch } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const addToCart = (product: any) => {
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

  const openQuickView = (product) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.category.toLowerCase().replace(" ", "-") === activeTab)

  const tabs = [
    { id: "all", label: "All Products" },
    { id: "jewelry", label: "Jewelry" },
    { id: "home-decor", label: "Home Decor" },
    { id: "clothing", label: "Clothing" },
    { id: "art", label: "Art" },
  ]

  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular handcrafted items, carefully selected for their exceptional quality and unique
            design.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 mx-2 mb-2 rounded-full transition-all duration-300 ${
                activeTab === tab.id ? "bg-terracotta-500 text-white" : "bg-white text-gray-700 hover:bg-terracotta-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      product.badge === "New"
                        ? "bg-green-500 text-white"
                        : product.badge === "Bestseller"
                          ? "bg-yellow-500 text-white"
                          : product.badge === "Limited"
                            ? "bg-red-500 text-white"
                            : "bg-terracotta-500 text-white"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
                    <button
                      onClick={() => openQuickView(product)}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-block"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-terracotta-500 text-white px-4 py-2 rounded-lg hover:bg-terracotta-600 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 inline mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-terracotta-600 font-medium">{product.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-terracotta-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="bg-terracotta-500 text-white px-8 py-3 rounded-lg hover:bg-terracotta-600 transition-all duration-300 transform hover:scale-105 font-medium inline-block"
          >
            View All Products
          </Link>
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </section>
  )
}
