'use client'

import { useState } from 'react'
import PortfolioItem from './PortfolioItem'
import { portfolioItems, ProjectCategory } from '@/lib/portfolioData'

const ALL = null as ProjectCategory | null

export default function PortfolioSection() {
  const [active, setActive] = useState<ProjectCategory | null>(ALL)
  const filtered = active ? portfolioItems.filter(i => i.category === active) : portfolioItems

  const buttonClass = (isActive: boolean) =>
    `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
    }`

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button type="button" onClick={() => setActive(ALL)} className={buttonClass(active === ALL)}>All</button>
        {Object.values(ProjectCategory).map(cat => (
          <button key={cat} type="button" onClick={() => setActive(cat)} className={buttonClass(active === cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div className="relative max-h-[70vh] overflow-y-auto scroll-area pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, index) => (
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
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">No projects in this category yet.</p>
        )}
        <div className="pointer-events-none sticky bottom-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </div>
    </>
  )
}
