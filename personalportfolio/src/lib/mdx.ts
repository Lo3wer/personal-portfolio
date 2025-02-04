import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src', 'posts')

type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
  description: string;
}

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
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    })

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return undefined;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      content: content,
      description: data.description,
    }
  } catch (error) {
    console.error('Error reading post:', error);
    return undefined;
  }
} 