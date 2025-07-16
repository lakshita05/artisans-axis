"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { useCart } from "../context/CartContext"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  badge?: string
}

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
  openQuickView?: () => void
}

export default function ProductCard({ product, viewMode = "grid", openQuickView }: ProductCardProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
    })
  }

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover flex">
        <div className="relative w-48 h-48 flex-shrink-0">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.badge && (
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
          )}
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-terracotta-600 font-medium capitalize">
                {product.category.replace("-", " ")}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-terracotta-600 transition-colors">
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </h3>

            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
            </button>
            <button
              onClick={addToCart}
              className="flex-1 bg-terracotta-500 text-white px-4 py-2 rounded-lg hover:bg-terracotta-600 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.badge && (
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
        )}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
            <button
              onClick={openQuickView}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Quick View
            </button>
            <button
              onClick={addToCart}
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
          <span className="text-sm text-terracotta-600 font-medium capitalize">
            {product.category.replace("-", " ")}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-terracotta-600 transition-colors">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}
