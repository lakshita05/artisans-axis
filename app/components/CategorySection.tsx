import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Jewelry",
    description: "Handcrafted rings, necklaces, and earrings",
    image: "/images/category-jewelry.jpg",
    href: "/products?category=jewelry",
  },
  {
    name: "Home Decor",
    description: "Beautiful pieces for your living space",
    image: "/images/category-home-decor.jpg",
    href: "/products?category=home-decor",
  },
  {
    name: "Clothing",
    description: "Unique apparel and accessories",
    image: "/images/category-clothing.jpg",
    href: "/products?category=clothing",
  },
  {
    name: "Art",
    description: "Original paintings and sculptures",
    image: "/images/category-art.jpg",
    href: "/products?category=art",
  },
]

export default function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections of handcrafted items, each category featuring unique pieces from
            talented artisans around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group card-hover bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-terracotta-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
