

// This is now an async Server Component (SSR)
export default async function BlogPage() {
  // This runs on the SERVER for each request
  let posts = []
  let error = null

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6", {
      // Optional: Add caching
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) throw new Error("Failed to fetch")
    posts = await response.json()
  } catch (err) {
    error = "Failed to load posts"
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Pet Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore fascinating articles about wolves, dogs, and the incredible bond between humans and canines.
        </p>
      </div>

      {error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.body.substring(0, 150)}...</p>
              <a href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-700">
                Read More →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
