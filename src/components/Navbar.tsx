'use client'

import { useEffect, useRef, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#photos', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [isScrolled, setIsScrolled] = useState(false)
  const isClickScrollingRef = useRef(false)
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleNavClick = (href: string) => {
    setActiveSection(href)
    setOpen(false)
    isClickScrollingRef.current = true
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false
    }, 800)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      setIsScrolled(scrollY > 20)

      // If user recently clicked a nav link, don't override the active section during smooth scrolling
      if (isClickScrollingRef.current) return

      // 1. If at top of the page, highlight Home
      if (scrollY < 80) {
        setActiveSection('#home')
        return
      }

      // 2. Only highlight Contact if at the very bottom AND the gallery heading has scrolled above the screen
      const photosEl = document.getElementById('photos')
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )
      const isAtVeryBottom = scrollY + windowHeight >= docHeight - 30
      const isPastGallery = photosEl ? photosEl.getBoundingClientRect().top < -150 : true

      if (isAtVeryBottom && isPastGallery) {
        setActiveSection('#contact')
        return
      }

      // 3. For all other sections, check which section is currently in view
      const sectionIds = ['photos', 'projects', 'about']
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= windowHeight * 0.45 && rect.bottom > 0) {
            setActiveSection(`#${id}`)
            return
          }
        }
      }

      setActiveSection('#home')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-teal-50/90 dark:bg-ink/90 backdrop-blur-md'
          : 'bg-teal-50/80 dark:bg-ink/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-3.5">
        <div className="flex justify-between items-center">
          <ThemeToggle />
          <ul className="hidden md:flex space-x-2 justify-center flex-grow">
            {links.map(l => {
              const isActive = activeSection === l.href
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => handleNavClick(l.href)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-teal-100/80 text-teal-700 dark:bg-ink-hover dark:text-teal-200/80 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-teal-50/80 dark:hover:bg-ink-panel'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-ink-hover transition-colors"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <div className="hidden md:block w-10"></div>
        </div>

        {/* Mobile menu dropdown */}
        {open && (
          <ul className="md:hidden mt-3 flex flex-col pb-2 space-y-1 pt-2 border-t border-gray-200/40 dark:border-ink-border/50">
            {links.map(l => {
              const isActive = activeSection === l.href
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => handleNavClick(l.href)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-teal-100/80 text-teal-700 dark:bg-ink-hover dark:text-teal-200/80'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-teal-100/50 dark:hover:bg-ink-hover'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </nav>
    </header>
  )
}
