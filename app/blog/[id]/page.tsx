"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import LoadingSpinner from "@/components/LoadingSpinner"
import ErrorMessage from "@/components/ErrorMessage"
import CommentForm from "@/components/CommentForm"
import CommentList from "@/components/CommentList"

interface Post {
  id: number
  title: string
  body: string
  userId: number
  category: string
  image: string
}

export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newComment, setNewComment] = useState<any>(null)

  const handleCommentAdded = (comment: any) => {
    setNewComment(comment)
    // Reset after a short delay to allow CommentList to process it
    setTimeout(() => setNewComment(null), 100)
  }

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string)
    }
  }, [params.id])

  const fetchPost = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      // Simulate fetching specific pet post
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const petPosts = [
        {
          id: 1,
          title: "The Mighty Dire Wolf: Giants of the Ice Age",
          body: "Dire wolves (Canis dirus) were prehistoric predators that roamed North America during the Pleistocene epoch. These magnificent creatures were larger and more robust than modern wolves, with powerful jaws designed for crushing bones.\n\nUnlike their modern relatives, dire wolves had shorter legs and a more muscular build, making them formidable hunters of megafauna like bison and horses. Recent DNA analysis has revealed that dire wolves were actually quite distinct from modern wolves, representing a separate lineage that diverged millions of years ago.\n\nThese ancient predators lived in packs and were highly successful hunters. Their fossils show evidence of frequent bone fractures, suggesting they lived dangerous lives pursuing large prey. The extinction of dire wolves around 10,000 years ago coincided with the end of the last ice age and the disappearance of many large mammals they depended on for food.",
          userId: 1,
          category: "Dire Wolves",
          image: "images/dire wolves.jpg",
        },
        {
          id: 2,
          title: "Understanding Modern Wolf Behavior and Pack Dynamics",
          body: "Gray wolves (Canis lupus) are highly social animals that live in complex family structures called packs. These intelligent predators communicate through howls, body language, and scent marking.\n\nModern wolves are smaller than their dire wolf ancestors but are incredibly adaptable, surviving in diverse habitats from Arctic tundra to temperate forests. A typical wolf pack consists of a breeding pair (the alpha male and female) and their offspring from the current and previous years.\n\nWolves are known for their incredible hunting strategies, working together to take down prey much larger than themselves. Their howls can be heard up to 6 miles away and serve multiple purposes: coordinating hunts, calling the pack together, and marking territory. Each wolf has a unique howl, like a fingerprint, allowing pack members to identify each other from great distances.",
          userId: 2,
          category: "Modern Wolves",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          id: 3,
          title: "From Wolf to Woof: The Amazing Evolution of Dogs",
          body: "The domestication of dogs began approximately 15,000-40,000 years ago when early humans formed partnerships with wolves. Through selective breeding, humans transformed fierce predators into loyal companions.\n\nThis evolutionary journey resulted in over 300 dog breeds today, each adapted for specific purposes from hunting to herding to companionship. The process began when some wolves were less fearful of humans and began scavenging around human settlements. Over generations, humans selectively bred the most docile and useful individuals.\n\nThe transformation from wolf to dog involved significant physical and behavioral changes. Dogs developed floppy ears, curled tails, and varied coat colors - traits rarely seen in wild wolves. They also retained juvenile characteristics throughout their lives, a process called neoteny, which makes them more appealing to humans and easier to train.",
          userId: 3,
          category: "Dog Evolution",
          image: "/placeholder.svg?height=400&width=600",
        },
      ]

      const foundPost = petPosts.find((p) => p.id === Number.parseInt(id))
      if (!foundPost) throw new Error("Post not found")

      setPost(foundPost)
    } catch (err) {
      setError("Failed to load the blog post.")
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!post) return <ErrorMessage message="Post not found" />

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      
      

      {/* Post Content */}
      <article className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
        {/* Featured Image */}
        <div className="h-64 md:h-96 overflow-hidden">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}
            >
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-6">By Wildlife Expert {post.userId}</div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {post.body.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
        <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
        <CommentList postId={post.id} newComment={newComment} />
      </div>
    </div>
  )
}
