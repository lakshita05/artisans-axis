"use client"

import { useState } from "react"
import { Heart, ShoppingBag, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "../context/CartContext"

// Mock wishlist data
const mockWishlistItems = [
  {
    id: "1",
    name: "Handwoven Ceramic Bowl",
    price: 45,
    originalPrice: 60,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Decor",
    inStock: true,
  },
  {
    id: "2",
    name: "Silver Artisan Necklace",
    price: 120,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jewelry",
    inStock: true,
  },
  {
    id: "3",
    name: "Embroidered Silk Scarf",
    price: 85,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    inStock: false,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  const { dispatch } = useCart()

  const removeFromWishlist = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (item: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      },
    })
  }

  const addAllToCart = () => {
    wishlistItems.forEach((item) => {
      if (item.inStock) {
        addToCart(item)
      }
    })
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-lg text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save items you love to your wishlist and shop them later</p>
            <Link
              href="/products"
              className="bg-terracotta-500 text-white px-8 py-3 rounded-lg hover:bg-terracotta-600 transition-colors font-medium inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-4">
                <button
                  onClick={addAllToCart}
                  className="bg-terracotta-500 text-white px-6 py-2 rounded-lg hover:bg-terracotta-600 transition-colors font-medium"
                >
                  Add All to Cart
                </button>
                <button
                  onClick={() => setWishlistItems([])}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Clear Wishlist
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover relative">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>

                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <span className="text-sm text-terracotta-600 font-medium">{item.category}</span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-1">{item.name}</h3>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        className="flex-1 bg-terracotta-500 text-white px-4 py-2 rounded-lg hover:bg-terracotta-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{item.inStock ? "Add to Cart" : "Out of Stock"}</span>
                      </button>
                      <Link
                        href={`/products/${item.id}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
