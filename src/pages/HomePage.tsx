import React from 'react';
import CategoryCard, { Category } from '../components/CategoryCard';
import { useQuery } from '@tanstack/react-query';

// --- API Simulation ---
// Replace this with your actual API fetching logic
const fetchCategories = async (): Promise<Category[]> => {
  console.log('Fetching categories...');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500)); 

  // Simulate API response
  const categoriesData: Category[] = [
    {
      id: 1,
      name: 'General Discussion',
      description: 'Talk about anything and everything.',
      threadCount: 125,
      lastActivity: '2h ago',
      icon: 'ChatBubbleLeftRightIcon', 
      hasUnread: true,
    },
    {
      id: 2,
      name: 'Introductions',
      description: 'New here? Say hello!',
      threadCount: 42,
      lastActivity: '1d ago',
      icon: 'UserGroupIcon',
      hasUnread: false,
    },
    {
      id: 3,
      name: 'Tech Talk',
      description: 'Discuss gadgets, software, and more.',
      threadCount: 88,
      lastActivity: '5h ago',
      icon: 'ComputerDesktopIcon',
      hasUnread: false, 
    },
    {
      id: 4,
      name: 'Off-Topic',
      description: "Anything else that doesn't fit elsewhere.",
      threadCount: 210,
      lastActivity: '15m ago',
      icon: 'PuzzlePieceIcon',
      hasUnread: false,
    },
  ];

  // Simulate potential API error
  // if (Math.random() > 0.7) {
  //   throw new Error('Failed to fetch categories');
  // }

  return categoriesData;
};
// --- End API Simulation ---

const HomePage: React.FC = () => {
  // Fetch categories using useQuery
  const { data: categories, isLoading, isError, error } = useQuery<Category[], Error>({ 
    queryKey: ['categories'], // Unique key for this query
    queryFn: fetchCategories // The function that fetches data
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Forum Categories</h1>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {/* Placeholder loading cards */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-border animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error?.message || 'Could not fetch categories.'}</span>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !isError && categories && (
        <div className="space-y-4">
          {categories.length > 0 ? (
            categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))
          ) : (
            <div className="text-center p-6 bg-white border border-border rounded-lg shadow-sm text-text-subtle">
              No categories found.
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default HomePage;
