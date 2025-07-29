"use client"

import { useState, useEffect } from "react"
import PostCard from "./PostCard"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"

interface Post {
  id: number
  title: string
  body: string
  userId: number
  category: string
  image: string
}

export default function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate fetching pet-themed posts (NOT using JSONPlaceholder)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const petPosts = [
        {
          id: 1,
          title: "The Mighty Dire Wolf: Giants of the Ice Age",
          body: "Dire wolves (Canis dirus) were prehistoric predators that roamed North America during the Pleistocene epoch. These magnificent creatures were larger and more robust than modern wolves, with powerful jaws designed for crushing bones. Unlike their modern relatives, dire wolves had shorter legs and a more muscular build, making them formidable hunters of megafauna like bison and horses.",
          userId: 1,
          category: "Dire Wolves",
          image: "/placeholder.svg?height=300&width=400",
        },
        {
          id: 2,
          title: "Understanding Modern Wolf Behavior and Pack Dynamics",
          body: "Gray wolves (Canis lupus) are highly social animals that live in complex family structures called packs. These intelligent predators communicate through howls, body language, and scent marking. Modern wolves are smaller than their dire wolf ancestors but are incredibly adaptable, surviving in diverse habitats from Arctic tundra to temperate forests.",
          userId: 2,
          category: "Modern Wolves",
          image: "/placeholder.svg?height=300&width=400",
        },
        {
          id: 3,
          title: "From Wolf to Woof: The Amazing Evolution of Dogs",
          body: "The domestication of dogs began approximately 15,000-40,000 years ago when early humans formed partnerships with wolves. Through selective breeding, humans transformed fierce predators into loyal companions. This evolutionary journey resulted in over 300 dog breeds today, each adapted for specific purposes from hunting to herding to companionship.",
          userId: 3,
          category: "Dog Evolution",
          image: "/placeholder.svg?height=300&width=400",
        },
        {
          id: 4,
          title: "Dire Wolf Fossils: Windows into Prehistoric Life",
          body: "The La Brea Tar Pits in Los Angeles have yielded thousands of dire wolf fossils, making them one of the most well-represented prehistoric mammals. These fossils reveal that dire wolves had incredibly strong bite forces, even stronger than modern lions. Their teeth show wear patterns indicating they were bone-crushers, unlike modern wolves who are primarily flesh-eaters.",
          userId: 1,
          category: "Dire Wolves",
          image: "/placeholder.svg?height=300&width=400",
        },
        {
          id: 5,
          title: "Wolf Conservation: Protecting Our Wild Heritage",
          body: "Modern wolf populations have faced significant challenges due to habitat loss and human conflict. Conservation efforts have helped restore wolf populations in places like Yellowstone National Park, where they play a crucial role in maintaining ecosystem balance. Wolves are apex predators that help control deer and elk populations, allowing vegetation to recover.",
          userId: 2,
          category: "Modern Wolves",
          image: "/placeholder.svg?height=300&width=400",
        },
        {
          id: 6,
          title: "The Science Behind Dog Breeds: Genetics and Selection",
          body: "Modern dog breeds showcase the incredible plasticity of canine genetics. From tiny Chihuahuas to massive Great Danes, all dogs share 99.9% of their DNA with wolves. Selective breeding has emphasized different traits: sight hounds for speed, scent hounds for tracking, and working dogs for strength and endurance. This diversity represents one of the most successful examples of artificial selection.",
          userId: 3,
          category: "Dog Evolution",
          image: "/placeholder.svg?height=300&width=400",
        },
      ]

      setPosts(petPosts) // Using local mock data
    } catch (err) {
      setError("Failed to load blog posts. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={fetchPosts} />

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
