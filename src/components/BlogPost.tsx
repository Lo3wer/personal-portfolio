import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { BlogItem } from '@/lib/blogData'

export default function BlogPost({ post }: { post: BlogItem }) {
  if (post.type === 'photo') {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative w-full h-48">
            <Image src={post.image} alt={post.title ?? post.description} fill className="object-cover" />
          </div>
          <div className="p-4">
            {post.title && (
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{post.title}</h3>
            )}
            <time className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
              {formatDate(post.date)}
            </time>
            <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
      <Link href={`/blog/${post.slug}`} className="space-y-2 block">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          {post.title}
        </h3>
        <time className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(post.date)}
        </time>
        <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
      </Link>
    </article>
  )
} 