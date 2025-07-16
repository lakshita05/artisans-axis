"use client"

import { useState, useEffect } from "react"
import { Filter, Grid, List, ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"
import ProductFilters from "../components/ProductFilters"
import QuickViewModal from "../components/QuickViewModal"

const mockProducts = [
  {
    id: "1",
    name: "Handwoven Ceramic Bowl",
    price: 45,
    originalPrice: 60,
    image: "/images/ceramic-bowl.jpg",
    category: "home-decor",
    rating: 4.8,
    reviews: 24,
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Silver Artisan Necklace",
    price: 120,
    image: "/images/silver-necklace.jpg",
    category: "jewelry",
    rating: 4.9,
    reviews: 18,
    badge: "New",
  },
  {
    id: "3",
    name: "Embroidered Silk Scarf",
    price: 85,
    image: "/images/silk-scarf.jpg",
    category: "clothing",
    rating: 4.7,
    reviews: 32,
    badge: "Limited",
  },
  {
    id: "4",
    name: "Hand-carved Wooden Sculpture",
    price: 200,
    image: "/images/wooden-sculpture.jpg",
    category: "art",
    rating: 5.0,
    reviews: 12,
    badge: "Featured",
  },
  {
    id: "5",
    name: "Macrame Wall Hanging",
    price: 65,
    image: "/images/macrame-wall-hanging.jpg",
    category: "home-decor",
    rating: 4.6,
    reviews: 28,
    badge: "Trending",
  },
  {
    id: "6",
    name: "Leather Crossbody Bag",
    price: 95,
    image: "/images/leather-bag.jpg",
    category: "accessories",
    rating: 4.8,
    reviews: 41,
    badge: "Popular",
  },
  {
    id: "7",
    name: "Ceramic Tea Set",
    price: 75,
    image: "/images/ceramic-tea-set.jpg",
    category: "home-decor",
    rating: 4.5,
    reviews: 19,
    badge: "New",
  },
  {
    id: "8",
    name: "Handmade Copper Bracelet",
    price: 35,
    image: "/images/copper-bracelet.jpg",
    category: "jewelry",
    rating: 4.4,
    reviews: 27,
    badge: "Sale",
  },
]

export default function ProductsPage() {
  // Remove the mockProducts array and use the imported products instead
  // const [products, setProducts] = useState(products)
  // const [filteredProducts, setFilteredProducts] = useState(products)
  const [allProducts, setAllProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500],
    rating: 0,
  })

  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  useEffect(() => {
    // Change this line:
    // let filtered = [...products]
    let filtered = [...allProducts]

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) => filters.categories.includes(product.category))
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0))
        break
      default:
        // Featured sorting (bestsellers first)
        filtered.sort((a, b) => (b.badge === "Bestseller" ? 1 : 0) - (a.badge === "Bestseller" ? 1 : 0))
    }

    setFilteredProducts(filtered)
    // Change this line in useEffect:
    // }, [products, filters, sortBy])
  }, [allProducts, filters, sortBy])

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-lg text-gray-600">Discover our complete collection of handcrafted treasures</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-terracotta-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"} transition-colors`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-terracotta-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"} transition-colors`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {/* Change this line: */}
              {/* Showing {filteredProducts.length} of {products.length} products */}
              Showing {filteredProducts.length} of {allProducts.length} products
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64 flex-shrink-0`}>
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => setFilters({ categories: [], priceRange: [0, 500], rating: 0 })}
                  className="mt-4 bg-terracotta-500 text-white px-6 py-2 rounded-lg hover:bg-terracotta-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    openQuickView={() => {
                      setQuickViewProduct(product)
                      setIsQuickViewOpen(true)
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </div>
  )
}
