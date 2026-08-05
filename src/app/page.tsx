import Image from "next/image";
import PortfolioItem from '@/components/PortfolioItem';
import PhotoMap from '@/components/PhotoMap';
import { galleryData } from '@/lib/galleryData';
import { staticGalleryData } from '@/lib/staticGalleryData';
import { portfolioItems } from '@/lib/portfolioData';
import { experienceItems } from '@/lib/experienceData';
import SocialIcons from '@/components/SocialIcons';
import Navbar from '@/components/Navbar';

export default async function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative bg-[url('/images/background.JPG')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="text-center relative z-10">
            <h1 className="text-5xl font-bold mb-4 text-white">Leo Zhang</h1>
            <p className="text-xl text-gray-200">Welcome to my website!</p>
            <SocialIcons light />
          </div>
        </section>

        {/* About & Experience Section */}
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h2>
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="relative w-48 h-64 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <Image
                  src="/images/personal.jpeg"
                  alt="Leo Zhang"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  I&apos;m Leo, a computer engineering student at the University of British Columbia! 
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

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h2>
            <div className="relative max-h-[70vh] overflow-y-auto scroll-area pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioItems.map((item, index) => (
                  <PortfolioItem 
                    key={index} 
                    title={item.title} 
                    description={item.description} 
                    imageUrl={item.imageUrl} 
                    link={item.link} 
                    date={item.date}
                    category={item.category}
                  />
                ))}
              </div>
              <div className="pointer-events-none sticky bottom-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Photos Section */}
        <section id="photos" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Gallery</h2>
            <PhotoMap photos={[...galleryData, ...staticGalleryData]} />
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