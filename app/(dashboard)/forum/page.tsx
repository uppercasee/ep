'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

const initialPosts = [
  {
    id: 1,
    title: 'Best way to learn JavaScript?',
    content:
      'I am new to JavaScript and looking for recommendations on learning resources.',
    author: 'Alice Johnson',
    replies: 2,
  },
  {
    id: 2,
    title: 'How to improve problem-solving skills?',
    content:
      'What are some good ways to practice and enhance problem-solving skills?',
    author: 'John Doe',
    replies: 5,
  },
]

export default function Forum() {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState({ title: '', content: '' })

  const addPost = () => {
    if (newPost.title && newPost.content) {
      setPosts([
        ...posts,
        { id: posts.length + 1, ...newPost, author: 'You', replies: 0 },
      ])
      setNewPost({ title: '', content: '' })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Forum Discussions</h2>

      {/* Create New Post */}
      <Card className="p-4 space-y-4">
        <h4 className="text-lg font-semibold">Create a New Post</h4>
        <Input
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
            <p className="">{post.content}</p>
            <p className="text-sm mt-2">
              By {post.author} - {post.replies} Replies
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
