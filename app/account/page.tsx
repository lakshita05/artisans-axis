"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import { User, MapPin, Package, Heart, Settings, LogOut, Edit2, Plus } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 125.5,
    items: [
      { name: "Handwoven Ceramic Bowl", quantity: 1, price: 45 },
      { name: "Silver Artisan Necklace", quantity: 1, price: 120 },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 85.0,
    items: [{ name: "Embroidered Silk Scarf", quantity: 1, price: 85 }],
  },
]

const mockAddresses = [
  {
    id: "1",
    type: "Home",
    name: "John Doe",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    isDefault: true,
  },
  {
    id: "2",
    type: "Work",
    name: "John Doe",
    address: "456 Business Ave",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    isDefault: false,
  },
]

export default function AccountPage() {
  const { state, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: state.user?.name || "",
    email: state.user?.email || "",
    phone: "",
    birthday: "",
  })

  if (!state.isAuthenticated) {
    router.push("/auth")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Welcome back, {state.user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-terracotta-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">{state.user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{state.user?.name}</h3>
                <p className="text-gray-600 text-sm">{state.user?.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-terracotta-50 text-terracotta-700 border-l-4 border-terracotta-500"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 text-terracotta-600 hover:text-terracotta-700"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>{isEditing ? "Cancel" : "Edit"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
                      <input
                        type="date"
                        value={profileData.birthday}
                        onChange={(e) => setProfileData({ ...profileData, birthday: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex space-x-4">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-terracotta-500 text-white px-6 py-2 rounded-lg hover:bg-terracotta-600 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>

                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                            <p className="text-gray-600 text-sm">Placed on {order.date}</p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                            <p className="text-lg font-semibold text-gray-900 mt-1">${order.total.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.name} (x{item.quantity})
                              </span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex space-x-4">
                          <button className="text-terracotta-600 hover:text-terracotta-700 text-sm font-medium">
                            View Details
                          </button>
                          <button className="text-terracotta-600 hover:text-terracotta-700 text-sm font-medium">
                            Track Order
                          </button>
                          {order.status === "Delivered" && (
                            <button className="text-terracotta-600 hover:text-terracotta-700 text-sm font-medium">
                              Reorder
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                    <button className="flex items-center space-x-2 bg-terracotta-500 text-white px-4 py-2 rounded-lg hover:bg-terracotta-600 transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>Add Address</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockAddresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4 relative">
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-terracotta-100 text-terracotta-800 text-xs px-2 py-1 rounded">
                            Default
                          </span>
                        )}

                        <div className="mb-3">
                          <h3 className="font-semibold text-gray-900">{address.type}</h3>
                          <p className="text-gray-600">{address.name}</p>
                        </div>

                        <div className="text-gray-600 text-sm mb-4">
                          <p>{address.address}</p>
                          <p>
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <button className="text-terracotta-600 hover:text-terracotta-700 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                          {!address.isDefault && (
                            <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                              Set as Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">My Wishlist</h2>
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                    <button
                      onClick={() => router.push("/products")}
                      className="bg-terracotta-500 text-white px-6 py-2 rounded-lg hover:bg-terracotta-600 transition-colors"
                    >
                      Browse Products
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>

                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Email Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-terracotta-500 focus:ring-terracotta-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-gray-700">Order updates</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-terracotta-500 focus:ring-terracotta-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-gray-700">New product announcements</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-terracotta-500 focus:ring-terracotta-500"
                          />
                          <span className="ml-2 text-gray-700">Marketing emails</span>
                        </label>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Privacy Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-terracotta-500 focus:ring-terracotta-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-gray-700">Allow personalized recommendations</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-terracotta-500 focus:ring-terracotta-500"
                          />
                          <span className="ml-2 text-gray-700">Share data with partners</span>
                        </label>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Account Actions</h3>
                      <div className="space-y-3">
                        <button className="text-terracotta-600 hover:text-terracotta-700 font-medium">
                          Change Password
                        </button>
                        <br />
                        <button className="text-red-600 hover:text-red-700 font-medium">Delete Account</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
