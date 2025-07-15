"use client"

import { useState, useEffect } from "react"
import { Header } from "../components/Header" // Ensure this path is correct: src/pages/ -> up one level (src/) -> components/Header.jsx
import { Footer } from "../components/Footer"
import { CommentForm } from "../components/CommentForm"
import { CommentList } from "../components/CommentList"

export const BlogPost = () => {
  const [comments, setComments] = useState([])

  // Load comments when page loads
  useEffect(() => {
    const saved = localStorage.getItem("blog_comments")
    if (saved) {
      setComments(JSON.parse(saved))
    }
  }, [])

  // Save comments when they change
  useEffect(() => {
    localStorage.setItem("blog_comments", JSON.stringify(comments))
  }, [comments])

  const addComment = (name, email, text) => {
    const newComment = {
      id: Date.now(),
      name,
      email,
      text,
      date: new Date().toLocaleDateString(),
    }
    setComments([newComment, ...comments])
  }

  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="How to Take Care of Your Dog" />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Article Image */}
          <img src="public/dogPlaying.jpg" alt="Dog care"className="w-full h-170 object-cover"  />

          {/* Article Content */}
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <img src="public/me2.jpg" alt="Author" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold">Afomiya mesfin</h3>
                  <p className="text-gray-600 text-sm">Pet Care Expert</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Taking care of a dog is fun and rewarding. Here are some simple tips to keep your furry friend happy and
                healthy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Feed Your Dog Well</h2>
              <p className="text-gray-700 mb-6">
                Give your dog good quality food twice a day. Always have fresh water available. Don't give them
                chocolate or grapes - these are bad for dogs.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Exercise Daily</h2>
              <p className="text-gray-700 mb-6">
                Take your dog for walks every day. Play fetch in the yard. Dogs need exercise to stay healthy and happy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Visit the Vet</h2>
              <p className="text-gray-700 mb-6">
                Take your dog to the vet for regular check-ups. Get them vaccinated and keep them healthy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Show Love</h2>
              <p className="text-gray-700 mb-6">
                Pet your dog, play with them, and give them attention. Dogs love spending time with their owners.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700">
                  Remember: Every dog is different. Be patient and loving, and you'll have a great companion for years
                  to come!
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

          <div className="space-y-6">
            <CommentForm onSubmit={addComment} />
            <CommentList comments={comments} onDeleteComment={deleteComment} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
