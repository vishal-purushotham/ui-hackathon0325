import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

// Define the structure for a post object
interface Post {
  id: string | number;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
    joinDate?: string; // Could be relevant
  };
  createdAt: string; // Or Date object
  content: string; // Should support formatted text (e.g., markdown rendered to HTML)
  upvotes: number;
  downvotes: number;
  isOriginalPost?: boolean; // Flag for styling differences
}

interface PostItemProps {
  post: Post;
  onReply?: (postId: string | number) => void; // Callback for reply button
}

const PostItem: React.FC<PostItemProps> = ({ post, onReply }) => {
  // Basic function to simulate rendering formatted text (replace with actual markdown parser)
  const renderContent = (content: string) => {
    // In a real app, use library like 'marked' or 'react-markdown'
    // For now, just wrap in paragraph tags
    return { __html: `<p>${content.replace(/\n/g, '</p><p>')}</p>` };
  };

  return (
    <div 
      className={`
        flex gap-4 py-4 px-4 sm:px-6 
        ${post.isOriginalPost ? 'bg-white' : 'bg-white border-t border-border'}
        ${!post.isOriginalPost ? 'ml-0 sm:ml-8 lg:ml-12' : ''} // Indentation for replies on larger screens
      `}
    >
      {/* User Info Sidebar (Vertical on larger screens) */}
      <div className="flex-shrink-0 w-16 sm:w-20 text-center">
        <Link to={`/user/${post.author.id}`} className="block hover:opacity-90 transition-opacity">
          <span 
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-300 inline-block align-middle mb-2 border border-gray-200"
            style={post.author.avatarUrl ? { backgroundImage: `url(${post.author.avatarUrl})`, backgroundSize: 'cover' } : {}}
            role="img"
            aria-label={`${post.author.username}'s avatar`}
          ></span>
        </Link>
        <Link to={`/user/${post.author.id}`} className="text-sm font-medium text-text-primary truncate hover:underline">
          {post.author.username}
        </Link>
        {post.author.joinDate && <div className="text-xs text-text-subtle mt-1">Joined: {post.author.joinDate}</div>}
      </div>

      {/* Post Content and Actions */}
      <div className="flex-1 min-w-0">
        {/* Post Meta */}
        <div className="text-xs text-text-subtle mb-2">
          Posted {post.createdAt}
        </div>

        {/* Post Body - Use dangerouslySetInnerHTML for now, ensure proper sanitization in real app */}
        <div 
          className="prose prose-sm max-w-none text-text-primary" // Use Tailwind typography plugin styles
          dangerouslySetInnerHTML={renderContent(post.content)}
        />

        {/* Post Actions */}
        <div className="flex items-center gap-4 mt-4 text-sm text-text-subtle">
          <button 
            className="flex items-center gap-1 hover:text-primary transition-colors"
            title="Upvote Post"
            aria-label={`Upvote post (currently ${post.upvotes} upvotes)`}
          >
            <ArrowUpIcon className="w-4 h-4" />
            <span>{post.upvotes}</span>
          </button>
          <button 
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
            title="Downvote Post"
            aria-label={`Downvote post (currently ${post.downvotes} downvotes)`}
          >
            <ArrowDownIcon className="w-4 h-4" />
            {/* Optionally display downvotes: <span>{post.downvotes}</span> */}
          </button>
          {onReply && (
            <button 
              onClick={() => onReply(post.id)} 
              className="flex items-center gap-1 hover:text-primary transition-colors"
              title="Reply to Post"
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <span>Reply</span>
            </button>
          )}
          {/* Add other actions like Edit, Delete (with permissions) */}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
export type { Post }; 