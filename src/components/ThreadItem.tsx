import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, ChatBubbleOvalLeftEllipsisIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Thread {
  id: string | number;
  title: string;
  author: {
    username: string;
    id: string;
    avatarUrl?: string;
  };
  createdAt: string;
  replyCount: number;
  viewCount: number;
  upvoteCount: number;
}

interface ThreadItemProps {
  thread: Thread;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }) => {
  return (
    <div className="bg-white p-4 border-b border-border hover:bg-secondary/50 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left side: Title and Author Info */}
        <div className="flex-1 min-w-0"> 
          <Link 
            to={`/thread/${thread.id}`}
            className="font-medium text-lg text-text-primary hover:text-primary transition-colors block truncate"
          >
            {thread.title}
          </Link>
          <div className="flex items-center gap-2 text-sm text-text-subtle mt-1">
            <div className="flex items-center gap-1 flex-shrink-0">
              <Link to={`/user/${thread.author.id}`} className="flex items-center gap-1 hover:underline">
                <span 
                  className="w-5 h-5 rounded-full bg-gray-300 inline-block align-middle"
                  style={thread.author.avatarUrl ? { backgroundImage: `url(${thread.author.avatarUrl})`, backgroundSize: 'cover' } : {}}
                  role="img"
                  aria-label={`${thread.author.username}'s avatar`}
                ></span>
                <span>{thread.author.username}</span>
              </Link>
            </div>
            <span>•</span>
            <span className="flex-shrink-0">{thread.createdAt}</span>
          </div>
        </div>

        {/* Right side: Stats and Upvote */}
        {/* ... rest of the component ... */}
        <div className="flex items-center gap-4 text-sm text-text-subtle flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1" title={`${thread.replyCount} replies`}>
            <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
            <span>{thread.replyCount}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1" title={`${thread.viewCount} views`}>
            <EyeIcon className="w-4 h-4" />
            <span>{thread.viewCount}</span>
          </div>
          <button 
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors text-text-subtle hover:text-primary"
            aria-label={`Upvote thread (currently ${thread.upvoteCount} upvotes)`}
            title="Upvote"
          >
            <ArrowUpIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{thread.upvoteCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;
export type { Thread };
