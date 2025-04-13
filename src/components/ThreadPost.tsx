import Link from 'next/link';
import { UpvoteIcon, ChatIcon } from './Icons';

type ThreadPostProps = {
  id: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
    joinDate: string;
  };
  content: string;
  timestamp: string;
  upvoteCount: number;
  isOriginalPost?: boolean;
  nestingLevel?: number;
  onReply: (postId: string) => void;
};

export function ThreadPost({
  id,
  author,
  content,
  timestamp,
  upvoteCount,
  isOriginalPost = false,
  nestingLevel = 0,
  onReply,
}: ThreadPostProps) {
  const maxNestingLevel = 4;
  const effectiveNestingLevel = Math.min(nestingLevel, maxNestingLevel);
  
  return (
    <div 
      className={`
        ${isOriginalPost ? 'bg-white' : 'bg-white bg-opacity-80'} 
        rounded-lg shadow-sm border border-border p-4 mb-4
        ${effectiveNestingLevel > 0 ? `ml-${effectiveNestingLevel * 4}` : ''}
        ${effectiveNestingLevel === maxNestingLevel ? 'border-l-4 border-l-primary/30' : ''}
      `}
      style={
        effectiveNestingLevel > 0 && effectiveNestingLevel < maxNestingLevel 
          ? { marginLeft: `${effectiveNestingLevel * 1}rem` } 
          : {}
      }
    >
      <div className="flex items-start gap-4">
        {/* Author information */}
        <div className="flex-shrink-0">
          <Link href={`/profile/${author.id}`}>
            <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center text-primary font-medium">
              {author.avatar ? (
                <img src={author.avatar} alt={author.username} className="w-full h-full object-cover" />
              ) : (
                author.username.charAt(0).toUpperCase()
              )}
            </div>
          </Link>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div>
              <Link href={`/profile/${author.id}`} className="font-medium text-text hover:text-primary transition-colors">
                {author.username}
              </Link>
              <div className="text-xs text-subtle-text">
                Member since {author.joinDate}
              </div>
            </div>
            <div className="text-sm text-subtle-text">
              {timestamp}
            </div>
          </div>
          
          <div className="prose prose-sm max-w-none mt-2 text-text">
            {content}
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <button 
                className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary transition-colors text-subtle-text hover:text-primary" 
                aria-label="Upvote"
              >
                <UpvoteIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{upvoteCount}</span>
              </button>
            </div>
            
            <button 
              onClick={() => onReply(id)} 
              className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary transition-colors text-subtle-text hover:text-primary"
            >
              <ChatIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 