"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Filters {
  categories: string[]
  priceRange: [number, number]
  rating: number
}

interface ProductFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

const categories = [
  { id: "jewelry", label: "Jewelry", count: 24 },
  { id: "home-decor", label: "Home Decor", count: 18 },
  { id: "clothing", label: "Clothing", count: 32 },
  { id: "art", label: "Art", count: 15 },
  { id: "accessories", label: "Accessories", count: 12 },
]

export default function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId]

    onFiltersChange({
      ...filters,
      categories: newCategories,
    })
  }

  const handlePriceChange = (value: [number, number]) => {
    onFiltersChange({
      ...filters,
      priceRange: value,
    })
  }

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: rating === filters.rating ? 0 : rating,
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() => onFiltersChange({ categories: [], priceRange: [0, 500], rating: 0 })}
          className="text-sm text-terracotta-600 hover:text-terracotta-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div>
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Categories
          {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="rounded border-gray-300 text-terracotta-500 focus:ring-terracotta-500"
                />
                <span className="text-gray-700">{category.label}</span>
                <span className="text-gray-400 text-sm">({category.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Price Range
          {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange([Number.parseInt(e.target.value) || 0, filters.priceRange[1]])}
                className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                placeholder="Min"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange([filters.priceRange[0], Number.parseInt(e.target.value) || 500])}
                className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                placeholder="Max"
              />
            </div>

            <div className="space-y-2">
              {[
                { label: "Under $25", range: [0, 25] as [number, number] },
                { label: "$25 - $50", range: [25, 50] as [number, number] },
                { label: "$50 - $100", range: [50, 100] as [number, number] },
                { label: "$100 - $200", range: [100, 200] as [number, number] },
                { label: "Over $200", range: [200, 500] as [number, number] },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => handlePriceChange(option.range)}
                  className="block w-full text-left text-sm text-gray-600 hover:text-terracotta-600 transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div>
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Rating
          {expandedSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`flex items-center space-x-2 w-full text-left p-2 rounded-lg transition-colors ${
                  filters.rating === rating ? "bg-terracotta-50 text-terracotta-700" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm">& Up</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
