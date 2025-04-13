import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThreadItem } from '@/components/ThreadItem';
import Link from 'next/link';
import { SearchIcon } from '@/components/Icons';

// Types
type SearchResult = {
  id: string;
  type: 'thread' | 'post';
  title: string;
  content?: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  timestamp: string;
  categoryId: string;
  threadId?: string;
  matchContext?: string;
  replyCount: number;
  viewCount: number;
  upvoteCount: number;
};

// Mock search results
const mockResults: SearchResult[] = [
  {
    id: 'thread-1',
    type: 'thread',
    title: 'Welcome to our new forum platform!',
    author: {
      id: 'admin',
      username: 'Admin',
    },
    timestamp: '2 days ago',
    categoryId: 'announcements',
    replyCount: 24,
    viewCount: 521,
    upvoteCount: 48,
  },
  {
    id: 'post-5',
    type: 'post',
    title: 'Tips and tricks for new members',
    content: 'Welcome to the forum! Here are some tips to help you get started...',
    author: {
      id: 'moderator',
      username: 'Moderator',
    },
    timestamp: '5 hours ago',
    categoryId: 'help',
    threadId: 'thread-2',
    matchContext: '...Welcome to the <mark class="bg-yellow-200">forum</mark>! Here are some tips to help you...',
    replyCount: 15,
    viewCount: 320,
    upvoteCount: 32,
  },
  {
    id: 'thread-3',
    type: 'thread',
    title: 'Introduce yourself to the community',
    author: {
      id: 'user-1',
      username: 'JaneDoe',
    },
    timestamp: '1 day ago',
    categoryId: 'general',
    replyCount: 42,
    viewCount: 256,
    upvoteCount: 18,
  },
  {
    id: 'post-8',
    type: 'post',
    title: 'Introduce yourself to the community',
    content: 'Hello everyone! I thought it would be nice to have a thread where we can all introduce ourselves...',
    author: {
      id: 'user-1',
      username: 'JaneDoe',
    },
    timestamp: '1 day ago',
    categoryId: 'general',
    threadId: 'thread-3',
    matchContext: '...I thought it would be nice to have a thread where we can all introduce ourselves to the <mark class="bg-yellow-200">forum</mark> community...',
    replyCount: 0,
    viewCount: 0,
    upvoteCount: 18,
  },
];

export default function SearchPage({ searchParams }: { searchParams: { q?: string, filter?: string, category?: string } }) {
  const query = searchParams.q || '';
  const filter = searchParams.filter || 'all';
  const category = searchParams.category || 'all';
  
  // Filter results based on the query parameters
  const filteredResults = mockResults.filter(result => {
    if (filter !== 'all' && result.type !== filter) return false;
    if (category !== 'all' && result.categoryId !== category) return false;
    return true;
  });
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text mb-2">Search Results</h1>
          <p className="text-subtle-text">
            {query ? (
              <>
                Showing results for: <span className="font-medium text-text">"{query}"</span>
              </>
            ) : (
              'Showing all recent content'
            )}
          </p>
        </div>
        
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-4 mb-6">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-text">
                <SearchIcon className="h-5 w-5" />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select 
                name="filter"
                defaultValue={filter}
                className="px-4 py-2 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="all">All Content</option>
                <option value="thread">Threads</option>
                <option value="post">Posts</option>
              </select>
              
              <select 
                name="category"
                defaultValue={category}
                className="px-4 py-2 rounded-md border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="all">All Categories</option>
                <option value="general">General Discussion</option>
                <option value="announcements">Announcements</option>
                <option value="help">Help & Support</option>
              </select>
              
              <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Search
              </button>
            </div>
          </form>
        </div>
        
        {/* Results */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          {filteredResults.length > 0 ? (
            filteredResults.map(result => (
              <div key={result.id} className="border-b border-border p-4 hover:bg-secondary transition-colors">
                <div className="flex gap-2 text-sm text-subtle-text mb-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {result.type === 'thread' ? 'Thread' : 'Post'}
                  </span>
                  <Link href={`/category/${result.categoryId}`} className="hover:text-primary transition-colors">
                    {result.categoryId.charAt(0).toUpperCase() + result.categoryId.slice(1)}
                  </Link>
                </div>
                
                <h2 className="font-medium text-lg text-text">
                  <Link 
                    href={result.type === 'thread' 
                      ? `/category/${result.categoryId}/thread/${result.id}` 
                      : `/category/${result.categoryId}/thread/${result.threadId}#${result.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {result.title}
                  </Link>
                </h2>
                
                {result.matchContext && (
                  <div className="mt-2 text-subtle-text" dangerouslySetInnerHTML={{ __html: result.matchContext }} />
                )}
                
                <div className="flex items-center gap-2 text-sm text-subtle-text mt-2">
                  <Link href={`/profile/${result.author.id}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                    <span className="w-5 h-5 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center text-xs text-primary font-medium">
                      {result.author.avatar ? (
                        <img src={result.author.avatar} alt={result.author.username} className="w-full h-full object-cover" />
                      ) : (
                        result.author.username.charAt(0).toUpperCase()
                      )}
                    </span>
                    <span>{result.author.username}</span>
                  </Link>
                  <span>•</span>
                  <span>{result.timestamp}</span>
                  {result.type === 'thread' && (
                    <>
                      <span>•</span>
                      <span>{result.replyCount} replies</span>
                      <span>•</span>
                      <span>{result.viewCount} views</span>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-subtle-text mb-4">No results found for the current search criteria.</p>
              <p className="text-text">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredResults.length > 0 && (
          <div className="flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-md border border-border text-subtle-text hover:text-primary hover:border-primary transition-colors">
                <span className="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-primary text-white">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md border border-border text-subtle-text hover:text-primary hover:border-primary transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md border border-border text-subtle-text hover:text-primary hover:border-primary transition-colors">
                <span className="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 