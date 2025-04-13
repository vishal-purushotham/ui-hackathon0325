import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThreadItem } from '@/components/ThreadItem';
import { NewThreadButton } from '@/components/NewThreadButton';
import Link from 'next/link';

// Mock data for categories
const categories = {
  'general': {
    id: 'general',
    name: 'General Discussion',
    description: 'General discussions about any topic',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  'announcements': {
    id: 'announcements',
    name: 'Announcements',
    description: 'Official announcements from the administration',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  'help': {
    id: 'help',
    name: 'Help & Support',
    description: 'Get help with any issues you encounter',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

// Mock threads data
const threadsByCategory = {
  'general': [
    {
      id: 'thread-3',
      title: 'Introduce yourself to the community',
      author: {
        id: 'user-1',
        username: 'JaneDoe',
      },
      timestamp: '1 day ago',
      replyCount: 42,
      viewCount: 256,
      upvoteCount: 18,
      categoryId: 'general',
    },
    {
      id: 'thread-4',
      title: 'What topics would you like to discuss more?',
      author: {
        id: 'user-2',
        username: 'JohnSmith',
      },
      timestamp: '3 days ago',
      replyCount: 28,
      viewCount: 189,
      upvoteCount: 15,
      categoryId: 'general',
    },
    {
      id: 'thread-5',
      title: 'Community event planning for next month',
      author: {
        id: 'moderator',
        username: 'Moderator',
      },
      timestamp: '4 days ago',
      replyCount: 36,
      viewCount: 215,
      upvoteCount: 22,
      categoryId: 'general',
    },
  ],
  'announcements': [
    {
      id: 'thread-1',
      title: 'Welcome to our new forum platform!',
      author: {
        id: 'admin',
        username: 'Admin',
      },
      timestamp: '2 days ago',
      replyCount: 24,
      viewCount: 521,
      upvoteCount: 48,
      categoryId: 'announcements',
    },
    {
      id: 'thread-6',
      title: 'Forum maintenance scheduled for this weekend',
      author: {
        id: 'admin',
        username: 'Admin',
      },
      timestamp: '12 hours ago',
      replyCount: 8,
      viewCount: 312,
      upvoteCount: 5,
      categoryId: 'announcements',
    },
  ],
  'help': [
    {
      id: 'thread-2',
      title: 'Tips and tricks for new members',
      author: {
        id: 'moderator',
        username: 'Moderator',
      },
      timestamp: '5 hours ago',
      replyCount: 15,
      viewCount: 320,
      upvoteCount: 32,
      categoryId: 'help',
    },
    {
      id: 'thread-7',
      title: 'How to format your posts with markdown',
      author: {
        id: 'admin',
        username: 'Admin',
      },
      timestamp: '1 week ago',
      replyCount: 12,
      viewCount: 245,
      upvoteCount: 28,
      categoryId: 'help',
    },
    {
      id: 'thread-8',
      title: 'Troubleshooting login issues',
      author: {
        id: 'moderator',
        username: 'Moderator',
      },
      timestamp: '3 days ago',
      replyCount: 18,
      viewCount: 186,
      upvoteCount: 12,
      categoryId: 'help',
    },
  ],
};

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = params.id;
  const category = categories[categoryId as keyof typeof categories];
  const threads = threadsByCategory[categoryId as keyof typeof threadsByCategory] || [];

  if (!category) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h1 className="text-2xl font-bold text-text mb-4">Category Not Found</h1>
            <p className="text-subtle-text mb-6">The category you're looking for doesn't exist or has been removed.</p>
            <Link href="/" className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="text-subtle-text hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-subtle-text">/</span>
            <span className="text-text font-medium">{category.name}</span>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="text-primary p-3 bg-primary/10 rounded-full">
                {category.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text">{category.name}</h1>
                <p className="text-subtle-text mt-1">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-text">Threads</h2>
          <NewThreadButton categoryId={categoryId} />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {threads.length > 0 ? (
            threads.map((thread) => (
              <ThreadItem
                key={thread.id}
                id={thread.id}
                title={thread.title}
                author={thread.author}
                timestamp={thread.timestamp}
                replyCount={thread.replyCount}
                viewCount={thread.viewCount}
                upvoteCount={thread.upvoteCount}
                categoryId={thread.categoryId}
              />
            ))
          ) : (
            <div className="p-8 text-center text-subtle-text">
              <p className="mb-4">No threads have been created in this category yet.</p>
              <NewThreadButton categoryId={categoryId} />
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-1">
            <button className="w-10 h-10 flex items-center justify-center rounded-md border border-border text-subtle-text hover:text-primary hover:border-primary transition-colors">
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md bg-primary text-white">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border border-border text-subtle-text hover:text-primary hover:border-primary transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border border-border text-subtle-text hover:text-primary hover:border-primary transition-colors">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border border-border text-subtle-text hover:text-primary hover:border-primary transition-colors">
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
} 