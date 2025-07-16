import Image from "next/image"
import { Heart, Users, Globe, Award } from "lucide-react"

const artisans = [
  {
    name: "Maria Santos",
    craft: "Ceramic Artist",
    location: "Oaxaca, Mexico",
    story:
      "Maria has been creating beautiful pottery for over 20 years, using techniques passed down through four generations of her family.",
    image: "/images/artisan-maria.jpg",
  },
  {
    name: "Rajesh Kumar",
    craft: "Textile Weaver",
    location: "Rajasthan, India",
    story:
      "Rajesh specializes in traditional block printing and hand-weaving, creating stunning fabrics that tell stories of ancient Indian culture.",
    image: "/images/artisan-rajesh.jpg",
  },
  {
    name: "Elena Popov",
    craft: "Jewelry Designer",
    location: "Sofia, Bulgaria",
    story:
      "Elena combines traditional metalworking techniques with contemporary design to create unique pieces that celebrate Bulgarian heritage.",
    image: "/images/artisan-elena.jpg",
  },
]

const values = [
  {
    icon: Heart,
    title: "Passion for Craft",
    description: "Every piece is created with love and dedication by skilled artisans who take pride in their work.",
  },
  {
    icon: Users,
    title: "Supporting Communities",
    description: "We work directly with artisan communities, ensuring fair wages and sustainable livelihoods.",
  },
  {
    icon: Globe,
    title: "Global Heritage",
    description: "Our products celebrate diverse cultural traditions from around the world.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We maintain the highest standards of quality while preserving traditional craftsmanship methods.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-terracotta-500 to-terracotta-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif font-bold text-white mb-6 animate-fade-in">Our Story</h1>
          <p className="text-xl text-terracotta-100 max-w-3xl mx-auto animate-slide-up">
            Connecting skilled artisans with people who appreciate the beauty and authenticity of handcrafted goods
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Preserving Traditional Craftsmanship</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2020, Artisan Craft was born from a simple belief: that handmade products carry a soul that
                mass-produced items simply cannot match. Every piece tells a story of tradition, skill, and cultural
                heritage.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We work directly with artisans from around the world, ensuring they receive fair compensation for their
                incredible work while helping preserve traditional crafting techniques for future generations.
              </p>
              <p className="text-lg text-gray-700">
                When you purchase from us, you're not just buying a product – you're supporting a craftsperson, their
                family, and their community.
              </p>
            </div>
            <div className="animate-scale-in">
              <Image
                src="/images/about-hero.jpg"
                alt="Artisan at work"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and every partnership we form
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="text-center p-6 bg-white rounded-xl shadow-lg card-hover animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-terracotta-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Artisan Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Meet Our Artisans</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get to know the talented craftspeople behind our beautiful products
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {artisans.map((artisan, index) => (
              <div
                key={artisan.name}
                className="bg-cream-50 rounded-xl overflow-hidden shadow-lg card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-64">
                  <Image src={artisan.image || "/placeholder.svg"} alt={artisan.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{artisan.name}</h3>
                  <p className="text-terracotta-600 font-medium mb-2">{artisan.craft}</p>
                  <p className="text-gray-600 text-sm mb-4">{artisan.location}</p>
                  <p className="text-gray-700">{artisan.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Craftsmanship Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From concept to creation, every step is carefully executed with attention to detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Design & Planning",
                description:
                  "Each piece begins with careful planning and design, respecting traditional techniques while incorporating modern aesthetics.",
              },
              {
                step: "02",
                title: "Handcrafted Creation",
                description:
                  "Skilled artisans use time-honored methods and premium materials to bring each design to life with meticulous attention to detail.",
              },
              {
                step: "03",
                title: "Quality Assurance",
                description:
                  "Every finished piece undergoes rigorous quality checks to ensure it meets our high standards before reaching you.",
              },
            ].map((process, index) => (
              <div
                key={process.step}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-terracotta-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-terracotta-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-6 animate-slide-up">Join Our Community</h2>
          <p className="text-xl text-terracotta-100 mb-8 animate-slide-up">
            Discover unique handcrafted treasures and support artisans worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <a
              href="/products"
              className="bg-white text-terracotta-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              Shop Collection
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-terracotta-600 transition-all duration-300 font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
