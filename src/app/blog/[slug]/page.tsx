import { getPostBySlug, BlogPost as BlogPostType, PhotoPost } from '@/lib/blogData'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogContentRenderer from '@/components/BlogContentRenderer'
import ThemeToggle from '@/components/ThemeToggle'

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/#blog"
            className="inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
          <ThemeToggle />
        </div>

        {post.type === 'photo' ? (
          <PhotoPostContent post={post} />
        ) : (
          <TextPostContent post={post} />
        )}
      </div>
    </article>
  )
}

function PhotoPostContent({ post }: { post: PhotoPost }) {
  return (
    <div>
      {post.title && (
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
      )}
      <time className="text-gray-500 dark:text-gray-400 block mb-6">{formatDate(post.date)}</time>
      <div className="relative w-full h-[32rem] mb-6">
        <Image src={post.image} alt={post.title ?? post.description} fill className="object-contain" />
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300">{post.description}</p>
    </div>
  )
}

function TextPostContent({ post }: { post: BlogPostType }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
      <time className="text-gray-500 dark:text-gray-400 block mb-8">{formatDate(post.date)}</time>
      <BlogContentRenderer blocks={post.content} />
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  return {
    title: post?.title ?? 'Blog Post',
    description: post?.description
  };
}