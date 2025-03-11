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
import {
  createPost,
  createReply,
  getPosts,
} from '@/features/forum/actions/forum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface Post {
  id: string
  title: string
  content: string
  author: string
  replies: Reply[]
}

interface Reply {
  id: string
  content: string
  author: string
}

export default function Forum() {
  const queryClient = useQueryClient()

  // Fetch posts
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  // Ensure unique posts and replies
  const postsMap = new Map<string, Post>()

  if (data) {
    for (const item of data) {
      const postId = item.posts.id

      if (!postsMap.has(postId)) {
        postsMap.set(postId, {
          id: postId,
          title: item.posts.title,
          content: item.posts.content,
          author: item.posts.author,
          replies: [],
        })
      }

      // Use a Set to filter unique replies
      const post = postsMap.get(postId)
      if (post && item.replies) {
        const uniqueReplies = new Map<string, Reply>(
          post.replies.map((r: Reply) => [r.id, r])
        )
        uniqueReplies.set(item.replies.id, item.replies) // Add only unique replies
        post.replies = Array.from(uniqueReplies.values())
      }
    }
  }

  const posts = Array.from(postsMap.values())
  console.log(posts)

  // Mutation for adding a post
  const addPostMutation = useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      createPost(title, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  // Mutation for adding a reply
  const addReplyMutation = useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      createReply(content, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [replies, setReplies] = useState<{ [key: string]: string }>({})

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
        <Button
          onClick={() =>
            addPostMutation.mutate(newPost, {
              onSuccess: () => setNewPost({ title: '', content: '' }),
            })
          }
        >
          Post
        </Button>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post: Post) => (
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

                {/* List all unique replies */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {/* Set max height and scroll */}
                  {post.replies.map((reply: Reply) => (
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
                <Button
                  onClick={() =>
                    addReplyMutation.mutate(
                      { postId: post.id, content: replies[post.id] },
                      {
                        onSuccess: () =>
                          setReplies({ ...replies, [post.id]: '' }),
                      }
                    )
                  }
                >
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
