import React from 'react';
import * as Icons from '@heroicons/react/24/outline'; // Import all outline icons
import { Link } from 'react-router-dom'; // Import Link

// Define a type for the icon names that exist in HeroIcons
// This provides better type safety than using string
// You might need to adjust this based on the actual icons you use
type HeroIconName = keyof typeof Icons;

interface Category {
  id: number | string;
  name: string;
  description: string;
  threadCount: number;
  lastActivity: string;
  icon: HeroIconName; // Use the defined type
  hasUnread?: boolean; // Optional indicator for new content
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Dynamically select the icon component based on the name
  const IconComponent = Icons[category.icon] || Icons.FolderIcon; // Default to FolderIcon if not found

  return (
    // Wrap the card content with Link, make the div a block element for the link to fill
    <Link 
      to={`/category/${category.id}`} 
      className={`
        block 
        bg-white rounded-lg shadow-sm p-4 mb-4 
        border border-border 
        transition-all duration-200 ease-in-out 
        hover:shadow-md hover:border-primary/50 
        ${category.hasUnread ? 'border-l-4 border-l-primary' : ''}
      `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0"> {/* Added min-w-0 for text truncation if needed */}
          <div className="flex-shrink-0 text-primary p-2 bg-primary/10 rounded-full">
            <IconComponent className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0"> {/* Added min-w-0 here too */}
            <h3 className="font-semibold text-lg text-text-primary truncate group-hover:text-primary">{category.name}</h3>
            <p className="text-text-subtle text-sm truncate">{category.description}</p>
          </div>
        </div>
        <div className="text-right text-sm text-text-subtle space-y-1 flex-shrink-0 ml-4">
          <div>{category.threadCount} threads</div>
          <div>Last active {category.lastActivity}</div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
export type { Category }; // Export the Category type for use elsewhere 