import Link from 'next/link'
import { formatDate } from '@/lib/utils'

type BlogPostProps = {
  title: string
  date: string
  description: string
  slug: string
}

export default function BlogPost({ title, date, description, slug }: BlogPostProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
      <Link href={`/blog/${slug}`} className="space-y-2 block">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          {title}
        </h3>
        <time className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(date)}
        </time>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </Link>
    </article>
  )
} 