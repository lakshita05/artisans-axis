"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import Image from "next/image"

const mockReviews = [
  {
    id: "1",
    user: "Sarah M.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-15",
    title: "Beautiful craftsmanship!",
    content:
      "This bowl exceeded my expectations. The quality is outstanding and it looks even better in person. Perfect for my dining table.",
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    user: "Michael R.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024-01-10",
    title: "Great quality, fast shipping",
    content:
      "Really happy with this purchase. The bowl is well-made and arrived quickly. Only minor issue is it's slightly smaller than I expected.",
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    user: "Emma L.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-05",
    title: "Perfect gift!",
    content: "Bought this as a housewarming gift and my friend absolutely loved it. The packaging was beautiful too.",
    helpful: 15,
    verified: false,
  },
]

interface ReviewsSectionProps {
  productId: string
}

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
  })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle review submission
    console.log("Submitting review:", newReview)
    setShowReviewForm(false)
    setNewReview({ rating: 5, title: "", content: "" })
  }

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: mockReviews.filter((review) => review.rating === rating).length,
    percentage: (mockReviews.filter((review) => review.rating === rating).length / mockReviews.length) * 100,
  }))

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-600">Based on {mockReviews.length} reviews</div>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-terracotta-500 text-white px-6 py-2 rounded-lg hover:bg-terracotta-600 transition-colors"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                placeholder="Tell others about your experience with this product"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-terracotta-500 text-white px-6 py-2 rounded-lg hover:bg-terracotta-600 transition-colors"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 border">
            <div className="flex items-start space-x-4">
              <Image
                src={review.avatar || "/placeholder.svg"}
                alt={review.user}
                width={40}
                height={40}
                className="rounded-full"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{review.user}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Verified Purchase</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>

                <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                <p className="text-gray-700 mb-4">{review.content}</p>

                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    <span>Not helpful</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
