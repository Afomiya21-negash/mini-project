"use client"

import { useState, useEffect } from "react"
import { Header } from "../components/Header" // Ensure this path is correct
import { Footer } from "../components/Footer"
import { PostCard } from "../components/PostCard"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"

export const BlogPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPosts = () => {
    setLoading(true)
    setError(null)
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching posts:", err)
        setError("Failed to load blog posts. Please try again later.")
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handlePostClick = (postId) => {
    alert(`You clicked on post ${postId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header title="Blog Posts" />
        <LoadingSpinner message="Fetching blog posts..." />
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header title="Blog Posts" />
        <ErrorMessage message={error} onRetry={fetchPosts} />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Blog Posts" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onClick={handlePostClick} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
