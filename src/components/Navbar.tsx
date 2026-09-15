'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Determine active section based on scroll position
      const sectionIds = links.map(l => l.href.substring(1))
      const scrollPosition = window.scrollY + 160

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(`#${sectionIds[i]}`)
          return
        }
      }
      setActiveSection('#home')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-teal-50/90 dark:bg-ink/90 backdrop-blur-md border-b border-gray-200/60 dark:border-ink-border/70 shadow-sm'
          : 'bg-teal-50/70 dark:bg-ink/70 backdrop-blur-sm'
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
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-teal-100 text-teal-800 dark:bg-ink-hover dark:text-teal-300 shadow-sm'
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
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-teal-100 text-teal-800 dark:bg-ink-hover dark:text-teal-300'
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
