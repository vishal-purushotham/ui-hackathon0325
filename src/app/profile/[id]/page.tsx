import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThreadItem } from '@/components/ThreadItem';
import Link from 'next/link';
import { ChatIcon } from '@/components/Icons';

// Types
type User = {
  id: string;
  username: string;
  joinDate: string;
  avatar?: string;
  bio?: string;
  location?: string;
  stats: {
    threads: number;
    posts: number;
    upvotesReceived: number;
  };
  socialLinks?: {
    website?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
};

type Thread = {
  id: string;
  title: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  timestamp: string;
  replyCount: number;
  viewCount: number;
  upvoteCount: number;
  categoryId: string;
};

// Mock data
const users: Record<string, User> = {
  'admin': {
    id: 'admin',
    username: 'Admin',
    joinDate: 'January 2023',
    bio: 'Forum administrator and developer. I manage the platform and help users with technical issues.',
    location: 'San Francisco, CA',
    stats: {
      threads: 12,
      posts: 86,
      upvotesReceived: 142,
    },
    socialLinks: {
      website: 'https://example.com',
      twitter: 'admin',
      github: 'admin',
    },
  },
  'moderator': {
    id: 'moderator',
    username: 'Moderator',
    joinDate: 'January 2023',
    bio: 'Forum moderator. I help keep discussions civil and on-topic.',
    location: 'New York, NY',
    stats: {
      threads: 8,
      posts: 124,
      upvotesReceived: 98,
    },
  },
  'user-1': {
    id: 'user-1',
    username: 'JaneDoe',
    joinDate: 'March 2023',
    bio: 'Software developer passionate about web technologies and UX design.',
    location: 'Seattle, WA',
    stats: {
      threads: 5,
      posts: 42,
      upvotesReceived: 67,
    },
    socialLinks: {
      github: 'janedoe',
      linkedin: 'janedoe',
    },
  },
  'user-2': {
    id: 'user-2',
    username: 'JohnSmith',
    joinDate: 'February 2023',
    bio: 'UX Designer with a focus on creating intuitive interfaces.',
    location: 'London, UK',
    stats: {
      threads: 3,
      posts: 28,
      upvotesReceived: 49,
    },
    socialLinks: {
      website: 'https://johnsmith.design',
      twitter: 'johnsmith',
    },
  },
  'user-3': {
    id: 'user-3',
    username: 'NewUser',
    joinDate: 'April 2023',
    bio: 'Computer science student interested in AI and machine learning.',
    location: 'Toronto, Canada',
    stats: {
      threads: 1,
      posts: 7,
      upvotesReceived: 12,
    },
  },
};

// Mock user threads
const userThreads: Record<string, Thread[]> = {
  'admin': [
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
  ],
  'moderator': [
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
  ],
  'user-1': [
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
  ],
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = users[id];
  const threads = userThreads[id] || [];
  
  if (!user) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h1 className="text-2xl font-bold text-text mb-4">User Not Found</h1>
            <p className="text-subtle-text mb-6">The user you're looking for doesn't exist or has deleted their account.</p>
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
        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden mb-8">
          {/* Profile Header */}
          <div className="bg-primary/5 p-6 sm:p-8 border-b border-border">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary/20 rounded-full overflow-hidden flex items-center justify-center text-4xl text-primary font-medium">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )}
              </div>
              
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-text mb-1">{user.username}</h1>
                <p className="text-subtle-text mb-4">Member since {user.joinDate}</p>
                
                {user.bio && (
                  <p className="text-text max-w-2xl mb-4">{user.bio}</p>
                )}
                
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  {user.location && (
                    <div className="text-subtle-text text-sm flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{user.location}</span>
                    </div>
                  )}
                  
                  {user.socialLinks && Object.entries(user.socialLinks).map(([platform, handle]) => (
                    <a 
                      key={platform}
                      href={platform === 'website' ? handle : `https://${platform}.com/${handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 border-b border-border">
            <div className="p-4 text-center border-r border-border">
              <div className="text-2xl font-bold text-text">{user.stats.threads}</div>
              <div className="text-subtle-text text-sm">Threads</div>
            </div>
            <div className="p-4 text-center border-r border-border">
              <div className="text-2xl font-bold text-text">{user.stats.posts}</div>
              <div className="text-subtle-text text-sm">Posts</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-text">{user.stats.upvotesReceived}</div>
              <div className="text-subtle-text text-sm">Upvotes</div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="p-4 border-b border-border bg-secondary">
            <div className="flex gap-4">
              <button className="px-4 py-2 text-primary font-medium border-b-2 border-primary">
                Threads
              </button>
              <button className="px-4 py-2 text-subtle-text hover:text-text transition-colors">
                Posts
              </button>
              <button className="px-4 py-2 text-subtle-text hover:text-text transition-colors">
                Upvoted
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div>
            {threads.length > 0 ? (
              <div>
                {threads.map(thread => (
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
            ) : (
              <div className="p-8 text-center text-subtle-text">
                <p>No threads have been created by this user yet.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Send Message Button */}
        <div className="flex justify-center">
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors">
            <ChatIcon className="h-5 w-5" />
            <span>Send Message</span>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
} 