import Image from 'next/image';
import Link from 'next/link';

interface PortfolioItemProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string; // Link to the project or more details
  date?: string;
  category?: string;
}

export default function PortfolioItem({ title, description, imageUrl, link, date, category }: PortfolioItemProps) {
  return (
    <div className="bg-white dark:bg-ink-panel rounded-lg shadow-lg overflow-hidden">
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{date}</span>
            <span className="px-2 py-1 text-xs rounded-full bg-teal-100 dark:bg-ink-hover text-gray-700 dark:text-gray-200">
              {category}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </Link>
    </div>
  );
} 