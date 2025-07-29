"use client" // Client component for form handling

import type React from "react"

import { useState } from "react"

interface CommentFormProps {
  postId: number // The ID of the post to comment on
  onCommentAdded: (comment: { id: number; name: string; comment: string; date: string }) => void
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  // State for form inputs
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission

    if (!name.trim() || !comment.trim()) return // Validate inputs

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create new comment
    const newComment = {
      id: Date.now(),
      name: name.trim(),
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
    }

    // Get existing comments from localStorage
    const existingComments = JSON.parse(localStorage.getItem(`comments-${postId}`) || '[]')
    
    // Add new comment
    const updatedComments = [...existingComments, newComment]
    
    // Save to localStorage
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments))

    // Notify parent component
    onCommentAdded(newComment)

    // Clear form
    setName("")
    setComment("")
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Adding..." : "Add Comment"}
      </button>
    </form>
  )
}
