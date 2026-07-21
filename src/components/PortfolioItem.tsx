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
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full h-48">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
            <span className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {category}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </Link>
    </div>
  );
} 