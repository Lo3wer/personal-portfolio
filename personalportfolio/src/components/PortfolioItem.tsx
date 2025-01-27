import Image from 'next/image';
import Link from 'next/link';

type PortfolioItemProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string; // Link to the project or more details
};

export default function PortfolioItem({ title, description, imageUrl, link }: PortfolioItemProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Link href={link}>
        <div className="relative w-full h-48">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </Link>
    </div>
  );
} 