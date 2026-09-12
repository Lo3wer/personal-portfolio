import { ContentBlock, GradingItem } from '@/lib/blogData'
import Image from 'next/image'

export default function BlogContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <p key={i} className="text-gray-700 dark:text-gray-200 leading-relaxed">{block.content}</p>
          case 'h2':
            return <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{block.content}</h2>
          case 'h3':
            return <h3 key={i} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">{block.content}</h3>
          case 'ul':
            return (
              <ul key={i} className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="list-decimal list-inside text-gray-700 dark:text-gray-200 space-y-1">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            )
          case 'img':
            return (
              <div key={i} className="relative w-full max-w-lg mx-auto h-64 my-6">
                <Image src={block.src} alt={block.alt} fill className="object-contain" />
              </div>
            )
          case 'meta':
            return (
              <div key={i} className="flex flex-wrap gap-4 my-4">
                {block.items.map((item, j) => (
                  <span key={j} className="px-3 py-1 rounded-full bg-teal-100 dark:bg-ink-hover text-gray-700 dark:text-gray-200 text-sm">
                    {item.label}: <strong>{item.value}</strong>
                  </span>
                ))}
              </div>
            )
          case 'grading':
            return (
              <div key={i} className="space-y-2 my-4">
                {block.items.map((item, j) => (
                  <GradingRow key={j} item={item} />
                ))}
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

function GradingRow({ item }: { item: GradingItem }) {
  return (
    <div>
      <div className="flex justify-between items-center text-gray-700 dark:text-gray-200 py-1">
        <span>{item.label}</span>
        <span className="font-medium">{item.value}</span>
      </div>
      {item.subitems && (
        <div className="ml-6 border-l-2 border-teal-200 dark:border-ink-border pl-4">
          {item.subitems.map((sub, i) => (
            <div key={i} className="flex justify-between items-center text-gray-600 dark:text-gray-400 py-0.5 text-sm">
              <span>{sub.label}</span>
              <span>{sub.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
