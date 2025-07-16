"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import SearchModal from "./SearchModal"
import CartSidebar from "./CartSidebar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { state: cartState } = useCart()
  const { state: authState, logout } = useAuth()

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-terracotta-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="font-serif text-xl font-bold text-gray-900">Artisan Craft</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-terracotta-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-terracotta-600 transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-terracotta-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-terracotta-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-terracotta-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link href="/wishlist" className="p-2 text-gray-700 hover:text-terracotta-600 transition-colors">
                <Heart className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-700 hover:text-terracotta-600 transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartState.itemCount}
                  </span>
                )}
              </button>

              {authState.isAuthenticated ? (
                <div className="relative group">
                  <button className="p-2 text-gray-700 hover:text-terracotta-600 transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/auth" className="p-2 text-gray-700 hover:text-terracotta-600 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-terracotta-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fade-in">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-700 hover:text-terracotta-600 transition-colors">
                  Home
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-terracotta-600 transition-colors">
                  Products
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-terracotta-600 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-terracotta-600 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
