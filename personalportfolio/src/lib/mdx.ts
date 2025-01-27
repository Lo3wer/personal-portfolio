import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src', 'posts')

export async function getAllPosts() {
  const files = fs.readdirSync(postsDirectory)

  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(postsDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug: file.replace(/\.mdx$/, ''),
        title: data.title,
        date: data.date,
        description: data.description,
      }
    })
    .sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any))

  return posts
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title,
    date: data.date,
    content,
  }
} 