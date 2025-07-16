import HeroSection from "./components/HeroSection"
import CategorySection from "./components/CategorySection"
import FeaturedProducts from "./components/FeaturedProducts"
import NewsletterSection from "./components/NewsletterSection"
import TestimonialsSection from "./components/TestimonialsSection"

export default function Home() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}
