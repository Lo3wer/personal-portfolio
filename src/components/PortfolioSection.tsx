'use client'

import { useState } from 'react'
import PortfolioItem from './PortfolioItem'
import ScrollReveal from './ScrollReveal'
import { portfolioItems, ProjectCategory } from '@/lib/portfolioData'

const ALL = null as ProjectCategory | null
const INITIAL_VISIBLE_COUNT = 6

export default function PortfolioSection() {
  const [active, setActive] = useState<ProjectCategory | null>(ALL)
  const [showAll, setShowAll] = useState(false)

  const filtered = active ? portfolioItems.filter(i => i.category === active) : portfolioItems
  const hasMore = filtered.length > INITIAL_VISIBLE_COUNT
  const visibleItems = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE_COUNT)

  const handleCategoryChange = (category: ProjectCategory | null) => {
    setActive(category)
    setShowAll(false)
  }

  const buttonClass = (isActive: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all ${
      isActive
        ? 'bg-teal-600 text-white shadow-sm dark:bg-ink-accent dark:text-white'
        : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-ink-panel dark:text-gray-300 dark:hover:bg-ink-hover border border-gray-200 dark:border-ink-border'
    }`

  const countForCategory = (category: ProjectCategory | null) => {
    if (!category) return portfolioItems.length
    return portfolioItems.filter(i => i.category === category).length
  }

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => handleCategoryChange(ALL)}
          className={buttonClass(active === ALL)}
        >
          All <span className="ml-1 opacity-70 text-xs">({countForCategory(ALL)})</span>
        </button>
        {Object.values(ProjectCategory).map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={buttonClass(active === cat)}
          >
            {cat} <span className="ml-1 opacity-70 text-xs">({countForCategory(cat)})</span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((item, index) => (
          <ScrollReveal
            key={`${item.title}-${index}`}
            animation="fade-up"
            delay={Math.min(index * 75, 450)}
          >
            <PortfolioItem
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              link={item.link}
              date={item.date}
              category={item.category}
            />
          </ScrollReveal>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 py-12">
          No projects in this category yet.
        </p>
      )}

      {/* Show More / Show Less Toggle Button */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll(prev => !prev)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-ink-panel border border-gray-200 dark:border-ink-border text-gray-800 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-ink-hover shadow-sm hover:shadow transition-all"
          >
            {showAll ? (
              <>Show Less</>
            ) : (
              <>Show All Projects ({filtered.length})</>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
