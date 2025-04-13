import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// --- Placeholder Data & Simulation --- 
// In a real app, fetch user data based on userId
const placeholderUser = {
  id: 'janeDoe',
  username: 'JaneDoe',
  avatarUrl: undefined, // Placeholder
  joinDate: 'Jan 2023',
  stats: {
    posts: 158,
    threads: 12,
    upvotesReceived: 450,
  }
};

// Reusable simulation hook
const useSimulatedFetch = <T,>(data: T, delay = 500) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => { setFetchedData(data); setIsLoading(false); }, delay);
    return () => clearTimeout(timer);
  }, [data, delay]);
  return { data: fetchedData, isLoading };
};

// Placeholder components for tab content (assuming these might also load data)
const UserPostsList = () => {
  const { isLoading } = useSimulatedFetch({}, 800); // Simulate tab content loading
  if (isLoading) return <div className="p-4 bg-white rounded-b-lg border-t border-border text-text-subtle animate-pulse"><div className="h-4 bg-gray-200 rounded w-1/3"></div></div>;
  return <div className="p-4 bg-white rounded-b-lg border-t border-border text-text-subtle">User's posts will appear here... (Loaded)</div>;
}
const UserThreadsList = () => {
  const { isLoading } = useSimulatedFetch({}, 900);
  if (isLoading) return <div className="p-4 bg-white rounded-b-lg border-t border-border text-text-subtle animate-pulse"><div className="h-4 bg-gray-200 rounded w-1/3"></div></div>;
  return <div className="p-4 bg-white rounded-b-lg border-t border-border text-text-subtle">User's threads will appear here... (Loaded)</div>;
}
const UserUpvotedList = () => {
  const { isLoading } = useSimulatedFetch({}, 1000);
  if (isLoading) return <div className="p-4 bg-white rounded-b-lg border-t border-border text-text-subtle animate-pulse"><div className="h-4 bg-gray-200 rounded w-1/3"></div></div>;
  return <div className="p-4 bg-white rounded-b-lg border-t border-border text-text-subtle">User's upvoted content will appear here... (Loaded)</div>;
}
// --- End Placeholder Data & Simulation ---

// --- Basic Tab Component --- 
// Consider moving to a dedicated Tabs.tsx file for more complex needs
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  if (!tabs || tabs.length === 0) return null;

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-border bg-white rounded-t-lg">
        <nav className="-mb-px flex space-x-6 px-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-3 px-1 border-b-2 
                font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-subtle hover:text-text-primary hover:border-gray-300'
                }
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div>{activeContent}</div>
    </div>
  );
};
// --- End Basic Tab Component ---

// --- Loading Skeleton Components ---
const ProfileHeaderSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6 flex flex-col items-center sm:flex-row sm:items-end gap-4 animate-pulse">
    <div className="flex-shrink-0">
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-300 border-4 border-white shadow-md"></div>
    </div>
    <div className="text-center sm:text-left flex-grow w-full sm:w-auto">
      <div className="h-7 bg-gray-300 rounded w-1/2 sm:w-1/3 mx-auto sm:mx-0 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 sm:w-1/4 mx-auto sm:mx-0 mb-5"></div>
      <div className="flex justify-center sm:justify-start gap-4 sm:gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="text-center space-y-1">
            <div className="h-5 bg-gray-300 rounded w-8 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TabsSkeleton: React.FC = () => (
   <div className="animate-pulse">
     <div className="border-b border-border bg-white rounded-t-lg">
        <div className="flex space-x-6 px-4 h-[45px] items-end">
            <div className="h-5 w-16 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-20 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-16 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
      <div className="p-4 h-20 bg-white rounded-b-lg border-t border-border">
           <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
   </div>
);
// --- End Loading Skeleton Components ---

const UserProfile: React.FC = () => {
  const { userId: _userId } = useParams<{ userId: string }>();
  const { data: user, isLoading } = useSimulatedFetch(placeholderUser);

  // Define tabs (content components now handle their own loading simulation)
  const profileTabs: Tab[] = [
    { id: 'posts', label: 'Posts', content: <UserPostsList /> },
    { id: 'threads', label: 'Threads', content: <UserThreadsList /> },
    { id: 'upvoted', label: 'Upvoted', content: <UserUpvotedList /> },
  ];

  // if (!isLoading && !user) return <div>User not found</div>; 

  return (
    <div>
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : user ? (
        <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6 flex flex-col items-center sm:flex-row sm:items-end gap-4">
          <div className="flex-shrink-0">
            <span 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-300 inline-block border-4 border-white shadow-md"
              style={user.avatarUrl ? { backgroundImage: `url(${user.avatarUrl})`, backgroundSize: 'cover' } : {}}
              role="img"
              aria-label={`${user.username}'s avatar`}
            ></span>
          </div>
          <div className="text-center sm:text-left flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{user.username}</h1>
            <p className="text-sm text-text-subtle mt-1">Joined: {user.joinDate}</p>
            <div className="mt-4 flex justify-center sm:justify-start gap-4 sm:gap-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-text-primary">{user.stats.posts}</div>
                <div className="text-text-subtle">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-text-primary">{user.stats.threads}</div>
                <div className="text-text-subtle">Threads</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-text-primary">{user.stats.upvotesReceived}</div>
                <div className="text-text-subtle">Upvotes</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
         // TODO: Add proper user not found state here if needed after loading
         <div></div> 
      )}

      {/* Activity Tabs - Show skeleton while profile header loads */}
      {isLoading ? <TabsSkeleton /> : <Tabs tabs={profileTabs} />}
    </div>
  );
};

export default UserProfile; 