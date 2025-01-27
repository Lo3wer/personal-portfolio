import Image from "next/image";
import { getAllPosts } from '@/lib/mdx';
import BlogPost from '@/components/BlogPost';
import PortfolioItem from '@/components/PortfolioItem';
import { portfolioItems } from '@/lib/portfolioData';
import { experienceItems } from '@/lib/experienceData';
import SocialIcons from '@/components/SocialIcons';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="w-10"></div>
            <ul className="flex space-x-8 justify-center flex-grow">
              <li><a href="#home" className="hover:text-gray-600 dark:hover:text-gray-300">Home</a></li>
              <li><a href="#about" className="hover:text-gray-600 dark:hover:text-gray-300">About</a></li>
              <li><a href="#portfolio" className="hover:text-gray-600 dark:hover:text-gray-300">Portfolio</a></li>
              <li><a href="#blog" className="hover:text-gray-600 dark:hover:text-gray-300">Blog</a></li>
              <li><a href="#contact" className="hover:text-gray-600 dark:hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">Leo Zhang</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Welcome to my portfolio!</p>
            <SocialIcons />
          </div>
        </section>

        {/* About & Experience Section */}
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h2>
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="relative w-48 h-64 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <Image
                  src="/images/personal.jpg"
                  alt="Leo Zhang"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Hi everyone! I'm Leo, a computer engineering student at the University of British Columbia! 
                  This is a portfolio of all the random stuff I decide to do and some of my projects!
                  FYI, this page is still under construction if you'd like to see old projects visit leozhang.cool.
                </p>
              </div>
            </div>

            {/* Experience Timeline */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Experience</h3>
              <div className="space-y-8">
                {experienceItems.map((item, index) => (
                  <div key={index} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 space-y-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.company}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.duration}</span>
                    </div>
                    <h4 className="text-lg text-gray-600 dark:text-gray-300">{item.position}</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span className="flex-grow text-left">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <PortfolioItem 
                  key={index} 
                  title={item.title} 
                  description={item.description} 
                  imageUrl={item.imageUrl} 
                  link={item.link} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Blog</h2>
            <div className="space-y-8">
              {posts.map((post) => (
                <BlogPost 
                  key={post.slug} 
                  title={post.title} 
                  date={post.date} 
                  description={post.description} 
                  slug={post.slug} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">If you wanna say hi!</h2>
            <SocialIcons />
          </div>
        </section>
      </main>
    </div>
  );
}