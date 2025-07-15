"use client"

export const CommentList = ({ comments, onDeleteComment }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-md border border-gray-100">
        <p className="text-lg font-medium">No comments yet. Be the first to share your thoughts!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl mr-4">
            {comment.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{comment.name}</h4>
                <p className="text-sm text-gray-500">{comment.date}</p>
              </div>
              <button
                onClick={() => onDeleteComment(comment.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.text}</p>
          </div>
        </div>
      ))}

      <div className="text-center pt-4">
        <p className="text-sm text-gray-500 font-medium">{comments.length} comments</p>
      </div>
    </div>
  )
}
