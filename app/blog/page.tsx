import type { Metadata } from "next"

// This is now an async Server Component (SSR)
export default async function BlogPage() {
  let posts = []
  let error = null

  try {
    const apiUrl = process.env.BLOG_API_URL || "https://jsonplaceholder.typicode.com"
    const postsPerPage = process.env.POSTS_PER_PAGE || "6"

    const response = await fetch(`${apiUrl}/posts?_limit=${postsPerPage}`, {
     
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })

    if (!response.ok) throw new Error("Failed to fetch posts")

    const fetchedPosts = await response.json()

    // Transform the data to match our pet blog theme
    posts = fetchedPosts.map((post: any, index: number) => {
      const categories = ["Dire Wolves", "Modern Wolves", "Dog Evolution"]
      const category = categories[index % categories.length]

      return {
        ...post,
        category,
    
      }
    })
  } catch (err) {
    error = "Failed to load posts. Please try again later."
    console.error("Blog posts fetch error:", err)
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
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="text-red-600 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Posts</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
             

              <div className="mb-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    post.category === "Dire Wolves"
                      ? "bg-red-100 text-red-800"
                      : post.category === "Modern Wolves"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {post.category}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.body.substring(0, 150)}...</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">By Wildlife Expert</span>
                <a href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Dynamic metadata generation (like getStaticProps for metadata)
export async function generateMetadata(): Promise<Metadata> {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Wild Paws Blog"
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  return {
    title: `Blog - ${siteName}`,
    description: "Explore fascinating articles about wolves, dogs, and their incredible evolutionary journey.",
    openGraph: {
      title: `Blog - ${siteName}`,
      description: "Discover the fascinating world of wolves, dogs, and their evolutionary journey.",
      url: `${siteUrl}/blog`,
      siteName,
      images: [
        {
          url: `${siteUrl}/og-blog.jpg`,
          width: 1200,
          height: 630,
          alt: "Wild Paws Blog - Pet Articles",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog - ${siteName}`,
      description: "Explore fascinating articles about wolves, dogs, and their incredible evolutionary journey.",
      images: [`${siteUrl}/og-blog.jpg`],
    },
  }
}
