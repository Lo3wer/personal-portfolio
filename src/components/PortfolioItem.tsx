import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface PortfolioItemProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  date?: string;
  category?: string;
}

export default function PortfolioItem({
  title,
  description,
  imageUrl,
  link,
  date,
  category,
}: PortfolioItemProps) {
  return (
    <div className="group bg-white dark:bg-ink-panel rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden">
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full"
      >
        <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-ink">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-200/90 transition-colors">
                {title}
              </h3>
              <FaExternalLinkAlt
                className="w-3.5 h-3.5 mt-1 text-gray-400 dark:text-gray-500 group-hover:text-teal-600 dark:group-hover:text-teal-200/90 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-gray-500 dark:text-gray-400 font-medium">{date}</span>
            {category && (
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-ink-hover text-teal-700 dark:text-teal-200/80 font-medium">
                {category}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}