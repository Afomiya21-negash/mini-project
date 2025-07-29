"use client"

import { useState, useEffect } from "react"

interface Comment {
  id: number
  name: string
  comment: string
  date: string
}

interface CommentListProps {
  postId: number
  newComment?: Comment | null
}

export default function CommentList({ postId, newComment }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])

  

  // Load comments from localStorage on component mount
  useEffect(() => {
    const loadComments = () => {
      try {
        const savedComments = JSON.parse(localStorage.getItem(`comments-${postId}`) || '[]')
       
        setComments([ ...savedComments])
      } catch (error) {
        console.error('Error loading comments:', error)
      
      }
    }

    loadComments()
  }, [postId])

  // Add new comment when it's submitted
  useEffect(() => {
    if (newComment) {
      setComments(prev => {
        // Check if comment already exists to avoid duplicates
        const exists = prev.some(comment => comment.id === newComment.id)
        if (!exists) {
          return [...prev, newComment]
        }
        return prev
      })
    }
  }, [newComment])

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>

      {comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to share your thoughts about these amazing animals!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{comment.name}</span>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
