import { type NextRequest, NextResponse } from "next/server"

interface CommentData {
  name: string
  comment: string
  postId: string
}


export async function POST(request: NextRequest) {
  try {
    const body: CommentData = await request.json()


    if (!body.name || !body.comment || !body.postId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

  
    if (body.name.length < 2 || body.name.length > 50) {
      return NextResponse.json({ error: "Name must be between 2 and 50 characters" }, { status: 400 })
    }

 
    if (body.comment.length < 10 || body.comment.length > 500) {
      return NextResponse.json({ error: "Comment must be between 10 and 500 characters" }, { status: 400 })
    }

    const newComment = {
      id: Date.now(),
      name: body.name.trim(),
      comment: body.comment.trim(),
      postId: Number.parseInt(body.postId),
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Comment added successfully!",
      comment: newComment,
    })
  } catch (error) {
    console.error("Comment submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get("postId")

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
  }


  
}
