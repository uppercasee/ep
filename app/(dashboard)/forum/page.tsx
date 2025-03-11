'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { useState } from 'react'

// Type for the Post and Reply objects
type Reply = {
  id: number
  content: string
  author: string
}

type Post = {
  id: number
  title: string
  content: string
  author: string
  replies: Reply[]
}

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Best way to learn JavaScript?',
    content:
      'I am new to JavaScript and looking for recommendations on learning resources.',
    author: 'Alice Johnson',
    replies: [
      {
        id: 1,
        content: 'Start with the basics, like variables and loops!',
        author: 'Bob',
      },
      {
        id: 2,
        content: 'Check out freeCodeCamp for great tutorials!',
        author: 'Charlie',
      },
    ],
  },
  {
    id: 2,
    title: 'How to improve problem-solving skills?',
    content:
      'What are some good ways to practice and enhance problem-solving skills?',
    author: 'John Doe',
    replies: [
      {
        id: 3,
        content: 'Try solving coding challenges on Codewars!',
        author: 'Alice',
      },
      {
        id: 4,
        content: 'Practice daily and break problems into smaller steps.',
        author: 'Eve',
      },
    ],
  },
]

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [replies, setReplies] = useState<{ [key: number]: string }>({})

  const addPost = () => {
    if (newPost.title && newPost.content) {
      setPosts([
        { id: posts.length + 1, ...newPost, author: 'You', replies: [] },
        ...posts, // Add the new post at the top
      ])
      setNewPost({ title: '', content: '' })
    }
  }

  // Type the function parameters postId (number) and replyContent (string)
  const addReply = (postId: number, replyContent: string) => {
    if (replyContent) {
      const newReply: Reply = {
        id: Date.now(),
        content: replyContent,
        author: 'You',
      }
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? { ...post, replies: [...post.replies, newReply] }
          : post
      )
      setPosts(updatedPosts)
      setReplies({ ...replies, [postId]: '' }) // Clear the reply input after posting
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Forum Discussions</h2>

      {/* Create New Post */}
      <Card className="p-4 space-y-4">
        <h4 className="text-lg font-semibold">Create a New Post</h4>
        <Textarea
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Textarea
          placeholder="Post Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <Button onClick={addPost}>Post</Button>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <h4 className="font-semibold text-lg">{post.title}</h4>
            <p>{post.content}</p>

            {/* Reply Button and Sheet */}
            <Sheet>
              <SheetTitle>
                <VisuallyHidden>
                  <h5>Replies</h5>
                </VisuallyHidden>
              </SheetTitle>
              <SheetTrigger>
                <p className="text-sm mt-2">
                  By {post.author} - {post.replies.length} Replies
                </p>
              </SheetTrigger>
              <SheetContent className="w-[550px] p-4 space-y-4">
                <h5 className="text-lg font-semibold">Replies</h5>

                {/* List all replies */}
                <div className="space-y-2">
                  {post.replies.map((reply) => (
                    <Card key={reply.id} className="p-4">
                      <p>{reply.content}</p>
                      <p className="text-sm text-gray-500">By {reply.author}</p>
                    </Card>
                  ))}
                </div>

                {/* Add New Reply */}
                <Textarea
                  placeholder="Type your reply..."
                  value={replies[post.id] || ''}
                  onChange={(e) =>
                    setReplies({ ...replies, [post.id]: e.target.value })
                  }
                />
                <Button onClick={() => addReply(post.id, replies[post.id])}>
                  Submit Reply
                </Button>
              </SheetContent>
            </Sheet>
          </Card>
        ))}
      </div>
    </div>
  )
}
