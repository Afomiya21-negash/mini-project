"use client"

export const PostCard = ({ post, onClick }) => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onClick(post.id)}
    >
      <div className="mb-4">
        <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold">
          Post #{post.id}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{post.body}</p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">Author: User {post.userId}</span>
        <span className="text-blue-600 text-sm font-medium hover:underline">Read more &rarr;</span>
      </div>
    </div>
  )
}
