import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostItem, { Post } from '../components/PostItem';
import ReplyComposer from '../components/ReplyComposer';
import Pagination from '../components/Pagination';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

// --- Placeholder Data & Simulation ---
const placeholderThreadTitle = 'What are your favorite hobbies outside of coding?';
const placeholderCategory = { id: '1', name: 'General Discussion' };

// Simulate a larger list of posts (OP + replies)
const allPlaceholderPosts: Post[] = [
  { id: 'p1', author: { id: 'janedoe', username: 'JaneDoe', avatarUrl: undefined, joinDate: 'Jan 2023' }, createdAt: '1 day ago', content: `Just curious what everyone likes to do when they're not staring at a screen! \n\nI've recently gotten into pottery, it's very relaxing.`, upvotes: 24, downvotes: 1, isOriginalPost: true },
  // Generate more replies
  ...Array.from({ length: 32 }, (_, i) => ({
    id: `p${i + 2}`,
    author: { id: `user${(i % 7) + 1}`, username: `User${(i % 7) + 1}`, avatarUrl: undefined, joinDate: `Mon ${i + 1}, 2024` },
    createdAt: `${23 - i} hours ago`,
    content: `This is reply number ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. `,
    upvotes: Math.floor(Math.random() * 20),
    downvotes: Math.floor(Math.random() * 3),
    isOriginalPost: false, // Ensure this is false for replies
  }))
];

// Reusable simulation hook (could be moved to a utils file)
const useSimulatedFetch = <T,>(data: T, delay = 700) => {
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
const PostItemSkeleton: React.FC<{ isOriginalPost?: boolean }> = ({ isOriginalPost }) => (
  <div className={`flex gap-4 py-4 px-4 sm:px-6 animate-pulse ${!isOriginalPost ? 'ml-0 sm:ml-8 lg:ml-12 border-t border-border' : ''} bg-white`}>
    {/* User Info Skeleton */}
    <div className="flex-shrink-0 w-16 sm:w-20 text-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 inline-block mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto mb-1"></div>
      <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
    {/* Content Skeleton */}
    <div className="flex-1 min-w-0">
      <div className="h-3 bg-gray-200 rounded w-24 mb-3"></div> 
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="h-5 w-10 bg-gray-200 rounded"></div>
        <div className="h-5 w-10 bg-gray-200 rounded"></div>
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);
// --- End Loading Skeleton Component ---

const POSTS_PER_PAGE = 10; // Replies per page

const ThreadView: React.FC = () => {
  const { threadId: _threadId } = useParams<{ threadId: string }>();

  // Simulate fetching ALL posts for the thread
  const { data: threadTitle, isLoading: isLoadingTitle } = useSimulatedFetch(placeholderThreadTitle, 400);
  const { data: allPosts, isLoading: isLoadingPosts } = useSimulatedFetch(allPlaceholderPosts);
  const { data: category, isLoading: isLoadingCategory } = useSimulatedFetch(placeholderCategory, 300);

  // Pagination State for Replies
  const [currentPage, setCurrentPage] = useState(1);

  // Separate OP and Replies *after* data loads
  const originalPost = useMemo(() => allPosts?.find(p => p.isOriginalPost), [allPosts]);
  const allReplies = useMemo(() => allPosts?.filter(p => !p.isOriginalPost) || [], [allPosts]);

  // Calculate current page replies and total pages
  const { currentReplies, totalPages } = useMemo(() => {
    if (!allReplies) {
      return { currentReplies: [], totalPages: 0 };
    }
    const total = Math.ceil(allReplies.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const repliesForPage = allReplies.slice(startIndex, endIndex);
    return { currentReplies: repliesForPage, totalPages: total };
  }, [allReplies, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top of replies list or thread title?
    // For now, scroll to top of page
    window.scrollTo(0, 0);
  };

  const isLoading = isLoadingTitle || isLoadingPosts || isLoadingCategory;

  const handleReplySubmit = (content: string) => {
    console.log('Submitting reply:', content);
    alert(`Reply Submitted (Simulated):\n${content}`);
  };

  const handleReplyButtonClick = (postId: string | number) => {
    console.log('Replying to post:', postId);
    const composer = document.querySelector('textarea[aria-label="Reply content"]') as HTMLTextAreaElement;
    composer?.focus();
  };

  return (
    <div>
      {/* Breadcrumbs / Back Link - Show placeholders if loading */}
      <div className={`mb-4 ${isLoading ? 'opacity-50' : ''}`}>
        {isLoadingCategory ? (
           <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        ) : (
          <Link 
            to={`/category/${category?.id || ''}`} 
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <ChevronLeftIcon className="w-4 h-4"/>
            Back to {category?.name || 'Category'}
          </Link>
        )}
      </div>

      {/* Thread Title - Show placeholder if loading */}
      {isLoadingTitle ? (
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
      ) : (
        <h1 className="text-3xl font-bold text-text-primary mb-6">{threadTitle}</h1>
      )}
      
      {/* Original Post Container */}
      <div className="bg-white rounded-t-lg shadow-sm border border-border overflow-hidden mb-0">
        {isLoadingPosts ? (
          <PostItemSkeleton isOriginalPost={true} />
        ) : originalPost ? (
          <PostItem post={originalPost} onReply={handleReplyButtonClick} />
        ) : (
          // If OP is missing after load (shouldn't happen with current logic, but good practice)
          <div className="p-6 text-center text-text-subtle">Could not load the original post.</div>
        )}
      </div>

      {/* Replies Container (Pagination applied here) */}
      <div className="rounded-b-lg shadow-sm border-x border-b border-border overflow-hidden bg-white mb-6">
          {isLoadingPosts ? (
             // Show reply skeletons while loading
             [...Array(POSTS_PER_PAGE / 2)].map((_, index) => <PostItemSkeleton key={index} />)
          ) : allReplies.length > 0 ? (
             // Render current page of replies
             currentReplies.map(reply => (
                 <PostItem key={reply.id} post={reply} onReply={handleReplyButtonClick} />
             ))
          ) : (
             // Empty state for replies (only show if OP exists)
             originalPost && <div className="p-4 text-center text-text-subtle border-t border-border">No replies yet. Start the conversation!</div>
          )}
      </div>

      {/* Pagination Controls for Replies */}
      {!isLoadingPosts && totalPages > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}

      {/* Reply Composer */}
      <div className={`mt-8 ${isLoadingPosts ? 'opacity-50 pointer-events-none' : ''}`}> {/* Add margin-top */} 
         <ReplyComposer onSubmit={handleReplySubmit} />
      </div>
     
    </div>
  );
};

export default ThreadView; 