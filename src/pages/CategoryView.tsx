import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ThreadItem, { Thread } from '../components/ThreadItem';
import NewThreadButton from '../components/NewThreadButton';
import Pagination from '../components/Pagination';
import { Category } from '../components/CategoryCard';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

// --- Placeholder Data & Simulation ---
const placeholderCategory: Category = {
  id: '1',
  name: 'General Discussion',
  description: 'Talk about anything and everything.',
  threadCount: 125,
  lastActivity: '2h ago',
  icon: 'ChatBubbleLeftRightIcon'
};

// Simulate a larger list of threads
const allPlaceholderThreads: Thread[] = Array.from({ length: 25 }, (_, i) => ({
  id: `t${i + 1}`,
  title: `Sample Thread Title ${i + 1} - Discussing Topic ${Math.floor(i / 5) + 1}`,
  author: { id: `user${i % 5 + 1}`, username: `User${i % 5 + 1}`, avatarUrl: undefined },
  createdAt: `${i + 1} hours ago`,
  replyCount: Math.floor(Math.random() * 50),
  viewCount: Math.floor(Math.random() * 500),
  upvoteCount: Math.floor(Math.random() * 100),
}));

// Simulate fetching data
const useSimulatedFetch = <T,>(data: T, delay = 600) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<T | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFetchedData(data);
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [data, delay]);

  return { data: fetchedData, isLoading };
};
// --- End Placeholder Data & Simulation ---

// --- Loading Skeleton Component ---
const ThreadItemSkeleton: React.FC = () => (
  <div className="bg-white p-4 border-b border-border animate-pulse">
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-200"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-1">
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-10 h-6 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  </div>
);
// --- End Loading Skeleton Component ---

const THREADS_PER_PAGE = 10; // Define how many threads per page

const CategoryView: React.FC = () => {
  const { categoryId: _categoryId } = useParams<{ categoryId: string }>();

  // Simulate fetching ALL threads
  const { data: category, isLoading: isLoadingCategory } = useSimulatedFetch(placeholderCategory);
  const { data: allThreads, isLoading: isLoadingThreads } = useSimulatedFetch(allPlaceholderThreads);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate current page threads and total pages using useMemo
  const { currentThreads, totalPages } = useMemo(() => {
    if (!allThreads) {
      return { currentThreads: [], totalPages: 0 };
    }
    const total = Math.ceil(allThreads.length / THREADS_PER_PAGE);
    const startIndex = (currentPage - 1) * THREADS_PER_PAGE;
    const endIndex = startIndex + THREADS_PER_PAGE;
    const threadsForPage = allThreads.slice(startIndex, endIndex);
    return { currentThreads: threadsForPage, totalPages: total };
  }, [allThreads, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top when page changes
    window.scrollTo(0, 0); 
  };

  const isLoading = isLoadingCategory || isLoadingThreads;

  return (
    <div>
      {/* Category Header & Back Button - Show placeholders if loading */}
      <div className={`mb-6 flex justify-between items-center ${isLoading ? 'opacity-50' : ''}`}>
        <div>
          <Link
            to="/"
            className={`text-sm text-primary hover:underline flex items-center gap-1 mb-2 ${isLoading ? 'pointer-events-none' : ''}`}
            aria-disabled={isLoading}
          >
            <ChevronLeftIcon className="w-4 h-4"/>
            Back to Categories
          </Link>
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded w-1/2 mt-1 mb-2 animate-pulse"></div>
          ) : (
            <h1 className="text-3xl font-bold text-text-primary">{category?.name}</h1>
          )}
          {isLoading ? (
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          ) : (
            <p className="text-text-subtle mt-1">{category?.description}</p>
          )}
        </div>
        <div className={isLoading ? 'opacity-0' : ''}>
          <NewThreadButton onClick={() => alert('Open new thread modal/page')} />
        </div>
      </div>

      {/* Thread List Container */}
      <div className="rounded-lg shadow-sm border border-border overflow-hidden bg-white">
        {isLoading ? (
          // Loading Skeletons (Adjust count based on THREADS_PER_PAGE)
          [...Array(THREADS_PER_PAGE)].map((_, index) => <ThreadItemSkeleton key={index} />)
        ) : (
          // Use currentThreads for rendering
          currentThreads && currentThreads.length > 0 ? (
            currentThreads.map(thread => (
              <ThreadItem key={thread.id} thread={thread} />
            ))
          ) : (
            <div className="p-6 text-center text-text-subtle">
              It's quiet in here... No threads found in this category yet. Be the first!
            </div>
          )
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
};

export default CategoryView;
