import Link from "next/link"

interface Post {
  id: number
  title: string
  body: string
  userId: number
  category: string
  image: string
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Dire Wolves":
        return "bg-red-100 text-red-800"
      case "Modern Wolves":
        return "bg-green-100 text-green-800"
      case "Dog Evolution":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
      {/* Post Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}
          >
            {post.category}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">By Wildlife Expert {post.userId}</span>
          <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Read More →
          </Link>
        </div>
      </div>
    </div>
  )
}
