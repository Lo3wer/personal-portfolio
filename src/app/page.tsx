import PhotoMap from '@/components/PhotoMap';
import Character3D from '@/components/Character3D';
import { galleryData } from '@/lib/galleryData';
import { staticGalleryData } from '@/lib/staticGalleryData';
import { experienceItems } from '@/lib/experienceData';
import SocialIcons from '@/components/SocialIcons';
import Navbar from '@/components/Navbar';
import PortfolioSection from '@/components/PortfolioSection';
import ScrollReveal from '@/components/ScrollReveal';

export default async function Home() {
  return (
    <div className="min-h-screen bg-teal-50 dark:bg-ink text-gray-900 dark:text-white">
      <Navbar />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative bg-[url('/images/background.JPG')] bg-cover bg-center bg-no-repeat"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="text-center relative z-10 px-4">
            <ScrollReveal animation="fade-up" duration={700}>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight">
                Leo Zhang
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 font-light mb-6">
                Welcome to my website!
              </p>
              <SocialIcons light />
            </ScrollReveal>
          </div>

          {/* Subtle Scroll Down Chevron */}
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors animate-bounce p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </section>

        {/* About & Experience Section */}
        <section id="about" className="py-24 bg-white dark:bg-ink-panel transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">About Me</h2>
              <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
                <div className="relative w-52 h-64 mb-6 md:mb-0 flex-shrink-0">
                  <Character3D className="w-full h-full" />
                </div>
                <div className="flex-1 text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                  <p>
                    I&apos;m Leo, a computer engineering student at the University of British Columbia! I love exploring how things work, especially computers. Some of my favourite projects were the lox interpreters and graphics renderer.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Experience Timeline */}
            <div>
              <ScrollReveal animation="fade-up">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                  Experience
                </h3>
              </ScrollReveal>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-200 dark:border-ink-border space-y-10">
                {experienceItems.map((item, index) => (
                  <ScrollReveal
                    key={`${item.company}-${index}`}
                    animation="fade-up"
                    delay={Math.min(index * 100, 300)}
                  >
                    <div className="relative">
                      {/* Timeline Marker Dot */}
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-teal-500 ring-4 ring-white dark:ring-ink-panel" />

                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            {item.company}
                          </h4>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-ink text-teal-700 dark:text-teal-200/90 w-fit">
                            {item.duration}
                          </span>
                        </div>
                        <h5 className="text-base font-medium text-teal-700 dark:text-gray-300">
                          {item.position}
                        </h5>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 text-sm sm:text-base">
                          {item.achievements.map((achievement, idx) => (
                            <li key={idx} className="leading-relaxed">
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-teal-50/60 dark:bg-ink transition-colors">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h2>
            </ScrollReveal>
            <PortfolioSection />
          </div>
        </section>

        {/* Photos Section */}
        <section id="photos" className="py-24 bg-white dark:bg-ink-panel transition-colors">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Gallery</h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <PhotoMap photos={[...galleryData, ...staticGalleryData]} />
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-10 bg-teal-50/60 dark:bg-ink transition-colors"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <ScrollReveal animation="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                If you wanna say hi!
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <SocialIcons />
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
}