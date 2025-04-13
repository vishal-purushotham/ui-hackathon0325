import Link from 'next/link';
import { UpvoteIcon, ChatIcon, EyeIcon } from './Icons';

type ThreadItemProps = {
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

export function ThreadItem({
  id,
  title,
  author,
  timestamp,
  replyCount,
  viewCount,
  upvoteCount,
  categoryId,
}: ThreadItemProps) {
  return (
    <div className="bg-white p-4 border-b border-border hover:bg-secondary transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Link href={`/category/${categoryId}/thread/${id}`}>
            <h3 className="font-medium text-lg text-text hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-subtle-text mt-1">
            <Link href={`/profile/${author.id}`} className="flex items-center gap-1 hover:text-primary transition-colors">
              <span className="w-5 h-5 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center text-xs text-primary font-medium">
                {author.avatar ? (
                  <img src={author.avatar} alt={author.username} className="w-full h-full object-cover" />
                ) : (
                  author.username.charAt(0).toUpperCase()
                )}
              </span>
              <span>{author.username}</span>
            </Link>
            <span>•</span>
            <span>{timestamp}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-subtle-text">
          <div className="flex items-center gap-1">
            <ChatIcon className="h-4 w-4" />
            <span>{replyCount}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <EyeIcon className="h-4 w-4" />
            <span>{viewCount}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              className="text-subtle-text hover:text-primary transition-colors" 
              aria-label="Upvote"
            >
              <UpvoteIcon className="h-4 w-4" />
            </button>
            <span>{upvoteCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 