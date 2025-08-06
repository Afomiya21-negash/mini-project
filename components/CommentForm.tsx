"use client"

import type React from "react"
import { useState } from "react"
import type { CommentFormProps } from "@/types"

interface FormErrors {
  name?: string
  comment?: string
  general?: string
}

interface Comment {
  id: number
  name: string
  comment: string
  date: string
  postId: number
  createdAt: string
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [success, setSuccess] = useState<string>("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate name
    if (!name.trim()) {
      newErrors.name = "Name is required"
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    } else if (name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters"
    }

    // Validate comment
    if (!comment.trim()) {
      newErrors.comment = "Comment is required"
    } else if (comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters"
    } else if (comment.trim().length > 500) {
      newErrors.comment = "Comment must be less than 500 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveCommentToLocalStorage = (newComment: Comment) => {
    try {
      // Get existing comments from localStorage
      const existingComments = localStorage.getItem("blogComments")
      const comments: Comment[] = existingComments ? JSON.parse(existingComments) : []
      
      // Add new comment
      comments.push(newComment)
      
      // Save back to localStorage
      localStorage.setItem("blogComments", JSON.stringify(comments))
      
      // Dispatch custom event to notify CommentList component
      window.dispatchEvent(new CustomEvent("commentsUpdated", { 
        detail: { postId, comments } 
      }))
    } catch (error) {
      console.error("Error saving comment to localStorage:", error)
      throw new Error("Failed to save comment")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new comment object
      const newComment: Comment = {
        id: Date.now(), // Simple ID generation
        name: name.trim(),
        comment: comment.trim(),
        postId: postId,
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
        createdAt: new Date().toISOString(),
      }

      // Save to localStorage
      saveCommentToLocalStorage(newComment)

      // Success
      setSuccess("Comment added successfully!")
      setName("")
      setComment("")

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Failed to submit comment",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}

      {/* General Error */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.general}
        </div>
      )}

      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your name"
          disabled={isSubmitting}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Comment Field */}
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Comment *
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${
            errors.comment ? "border-red-300 focus:ring-red-500" : "border-gray-300"
          }`}
          placeholder="Share your thoughts about this article..."
          disabled={isSubmitting}
        />
        <div className="flex justify-between mt-1">
          {errors.comment && <p className="text-sm text-red-600">{errors.comment}</p>}
          <p className={`text-sm ml-auto ${comment.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
            {comment.length}/500 characters
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Submitting...
          </>
        ) : (
          "Add Comment"
        )}
      </button>
    </form>
  )
}
