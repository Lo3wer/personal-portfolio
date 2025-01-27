import { getAllPosts } from '@/lib/mdx'
import BlogPost from '@/components/BlogPost'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post.slug} href="/" passHref>
              <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Back to Home
              </button>
            </Link>
          ))}
          {posts.map((post) => (
            <BlogPost key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
} 