"use client"

import { useState } from "react"
import { BlogPost } from "./pages/BlogPost"
import { BlogPosts } from "./pages/BlogPosts"
import "./index.css" // Import Tailwind CSS

function App() {
  const [currentView, setCurrentView] = useState("posts")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4 fixed w-full top-0 z-10">
        <div className="container mx-auto px-6 py-4 max-w-4xl flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Posts and pet blog</h1>

          <div className="space-x-4">
            <button
              onClick={() => setCurrentView("posts")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                currentView === "posts"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
            All posts
            </button>
            <button
              onClick={() => setCurrentView("article")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                currentView === "article"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
            Pet blog
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow pt-20">{currentView === "posts" ? <BlogPosts /> : <BlogPost />}</div>
    </div>
  )
}

export default App
