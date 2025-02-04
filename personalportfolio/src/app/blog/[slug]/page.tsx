import { getPostBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import '@/styles/mdx.css'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          href="/#blog"
          className="inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          ← Back to Home
        </Link>
        
        <div className="prose dark:prose-invert prose-lg">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <time className="text-gray-500 dark:text-gray-400">
            {formatDate(post.date)}
          </time>
          <div className="mt-8">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  return {
    title: post?.title,
    description: post?.description
  };
}