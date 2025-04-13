import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryCard } from '@/components/CategoryCard';
import { ThreadItem } from '@/components/ThreadItem';
import { NewThreadButton } from '@/components/NewThreadButton';

// Mock data
const categories = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'General discussions about any topic',
    threadCount: 125,
    lastActive: '2h ago',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    hasNewContent: true,
  },
  {
    id: 'announcements',
    name: 'Announcements',
    description: 'Official announcements from the administration',
    threadCount: 18,
    lastActive: '3d ago',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    hasNewContent: false,
  },
  {
    id: 'help',
    name: 'Help & Support',
    description: 'Get help with any issues you encounter',
    threadCount: 78,
    lastActive: '12h ago',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    hasNewContent: true,
  },
];

const trendingThreads = [
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
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text">Categories</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
                threadCount={category.threadCount}
                lastActive={category.lastActive}
                icon={category.icon}
                hasNewContent={category.hasNewContent}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text">Trending Threads</h2>
            <NewThreadButton />
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {trendingThreads.map((thread) => (
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
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
