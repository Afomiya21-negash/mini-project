"use client"

import { useState, useEffect } from "react"

interface Comment {
  id: number
  name: string
  comment: string
  date: string
  postId: number
  createdAt: string
}

interface CommentListProps {
  postId: number
}

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  // Load comments from localStorage
  const loadCommentsFromLocalStorage = () => {
    try {
      const storedComments = localStorage.getItem("blogComments")
      if (storedComments) {
        const allComments: Comment[] = JSON.parse(storedComments)
        // Filter comments for this specific post
        const postComments = allComments.filter(comment => comment.postId === postId)
        // Sort by newest first
        postComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setComments(postComments)
      } else {
        // Initialize with some sample comments if no comments exist
        initializeSampleComments()
      }
    } catch (error) {
      console.error("Error loading comments from localStorage:", error)
      initializeSampleComments()
    } finally {
      setLoading(false)
    }
  }

  // Initialize with sample comments for demonstration
  const initializeSampleComments = () => {
    const sampleComments: Comment[] = [
      {
        id: 1,
        name: "Sarah Wildlife",
        comment: "Fascinating article! I had no idea dire wolves were so different from modern wolves. The bone-crushing adaptation is incredible.",
        date: "2024-01-15",
        postId: 1,
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: 2,
        name: "Mike Canine Lover",
        comment: "This really helps explain why my German Shepherd still has some wolf-like behaviors. Evolution is amazing!",
        date: "2024-01-16",
        postId: 2,
        createdAt: "2024-01-16T14:20:00Z",
      },
      {
        id: 3,
        name: "Dr. Emma Zoologist",
        comment: "Great explanation of pack dynamics. I've observed similar behaviors in my field research with wild wolf populations.",
        date: "2024-01-17",
        postId: 3,
        createdAt: "2024-01-17T09:45:00Z",
      },
      {
        id: 4,
        name: "Alex Nature Photographer",
        comment: "The images really complement the content well. I've been photographing wolves for years and this captures their essence perfectly.",
        date: "2024-01-18",
        postId: 1,
        createdAt: "2024-01-18T16:15:00Z",
      },
      {
        id: 5,
        name: "Luna Dog Trainer",
        comment: "As a professional dog trainer, I can confirm that understanding wolf behavior has greatly improved my training methods.",
        date: "2024-01-19",
        postId: 2,
        createdAt: "2024-01-19T11:30:00Z",
      },
    ]

    // Save sample comments to localStorage
    localStorage.setItem("blogComments", JSON.stringify(sampleComments))
    
    // Filter for current post
    const postComments = sampleComments.filter(comment => comment.postId === postId)
    setComments(postComments)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get time ago string
  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const commentDate = new Date(dateString)
    const diffInMs = now.getTime() - commentDate.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
      return "Just now"
    }
  }

  // Listen for new comments
  useEffect(() => {
    loadCommentsFromLocalStorage()

    // Listen for comment updates
    const handleCommentsUpdate = (event: CustomEvent) => {
      if (event.detail.postId === postId) {
        loadCommentsFromLocalStorage()
      }
    }

    window.addEventListener("commentsUpdated", handleCommentsUpdate as EventListener)

    return () => {
      window.removeEventListener("commentsUpdated", handleCommentsUpdate as EventListener)
    }
  }, [postId])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading comments...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          Comments ({comments.length})
        </h3>
        
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">💬</div>
          <p className="text-gray-500 text-lg mb-2">No comments yet</p>
          <p className="text-gray-400">Be the first to share your thoughts about this amazing article!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg border hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">{comment.name}</span>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{formatDate(comment.createdAt)}</span>
                      <span>•</span>
                      <span>{formatTime(comment.createdAt)}</span>
                      <span>•</span>
                      <span>{getTimeAgo(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Comment actions */}
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
              
              {/* Comment stats */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="hover:text-blue-600 transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Like
                  </button>
                  <button className="hover:text-blue-600 transition-colors">Reply</button>
                </div>
                <span className="text-xs text-gray-400">#{comment.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
