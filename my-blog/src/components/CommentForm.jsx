"use client"

import { useState } from "react"

export const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name && email && comment) {
      onSubmit(name, email, comment)
      setName("")
      setEmail("")
      setComment("")
    }
  }

  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-inner border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Leave a Comment</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="comment-name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="comment-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="comment-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="comment-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="comment-text" className="block text-sm font-medium text-gray-700 mb-2">
            Comment
          </label>
          <textarea
            id="comment-text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Post Comment
        </button>
      </form>
    </div>
  )
}
