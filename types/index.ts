export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface Comment {
  id: number
  name: string
  email: string
  text: string
  date: string
}

export interface HeaderProps {
  title: string
}

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export interface CommentFormProps {
  postId: number
}

export interface CommentListProps {
  postId: number
}
