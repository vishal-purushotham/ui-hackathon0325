import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThreadPost } from '@/components/ThreadPost';
import Link from 'next/link';

// Define types for our data structures
type Author = {
  id: string;
  username: string;
  joinDate: string;
  avatar?: string;
};

type Post = {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  upvoteCount: number;
  parentId?: string;
};

type ThreadPost = Post & {
  children: ThreadPostWithChildren[];
  level: number;
};

type ThreadPostWithChildren = ThreadPost;

type Thread = {
  id: string;
  title: string;
  categoryId: string;
  posts: Post[];
};

// Mock data
const threads: Record<string, Thread> = {
  'thread-1': {
    id: 'thread-1',
    title: 'Welcome to our new forum platform!',
    categoryId: 'announcements',
    posts: [
      {
        id: 'post-1',
        author: {
          id: 'admin',
          username: 'Admin',
          joinDate: 'Jan 2023',
        },
        content: 'Welcome to our brand new forum platform! We\'ve worked hard to create a modern, responsive space for our community to connect and share ideas. This platform includes features like threaded discussions, upvoting, user profiles, and much more. Feel free to explore and let us know what you think!',
        timestamp: '2 days ago',
        upvoteCount: 48,
      },
      {
        id: 'post-2',
        author: {
          id: 'user-1',
          username: 'JaneDoe',
          joinDate: 'Mar 2023',
        },
        content: 'This looks amazing! I\'m excited to see the new features in action. The design is clean and modern - great job to everyone involved!',
        timestamp: '1 day ago',
        upvoteCount: 15,
        parentId: 'post-1',
      },
      {
        id: 'post-3',
        author: {
          id: 'user-2',
          username: 'JohnSmith',
          joinDate: 'Feb 2023',
        },
        content: 'I love the new upvoting system. It makes it much easier to see which discussions are most valuable.',
        timestamp: '1 day ago',
        upvoteCount: 12,
        parentId: 'post-1',
      },
      {
        id: 'post-4',
        author: {
          id: 'moderator',
          username: 'Moderator',
          joinDate: 'Jan 2023',
        },
        content: 'Thank you for the positive feedback! We\'ll continue to improve the platform based on your suggestions.',
        timestamp: '12 hours ago',
        upvoteCount: 8,
        parentId: 'post-2',
      },
    ],
  },
  'thread-2': {
    id: 'thread-2',
    title: 'Tips and tricks for new members',
    categoryId: 'help',
    posts: [
      {
        id: 'post-5',
        author: {
          id: 'moderator',
          username: 'Moderator',
          joinDate: 'Jan 2023',
        },
        content: 'Welcome to the forum! Here are some tips to help you get started:\n\n1. Complete your profile with a photo and short bio\n2. Introduce yourself in the welcome thread\n3. Take time to read the community guidelines\n4. Use the search function before posting a new question\n5. Be respectful and constructive in your responses',
        timestamp: '5 hours ago',
        upvoteCount: 32,
      },
      {
        id: 'post-6',
        author: {
          id: 'user-3',
          username: 'NewUser',
          joinDate: 'Apr 2023',
        },
        content: 'Thanks for these tips! As a new member, I was wondering how to format code in my posts?',
        timestamp: '3 hours ago',
        upvoteCount: 5,
        parentId: 'post-5',
      },
      {
        id: 'post-7',
        author: {
          id: 'moderator',
          username: 'Moderator',
          joinDate: 'Jan 2023',
        },
        content: 'Great question! You can format code by using three backticks (```) before and after your code block. For inline code, use single backticks.',
        timestamp: '2 hours ago',
        upvoteCount: 10,
        parentId: 'post-6',
      },
    ],
  },
  'thread-3': {
    id: 'thread-3',
    title: 'Introduce yourself to the community',
    categoryId: 'general',
    posts: [
      {
        id: 'post-8',
        author: {
          id: 'user-1',
          username: 'JaneDoe',
          joinDate: 'Mar 2023',
        },
        content: 'Hello everyone! I thought it would be nice to have a thread where we can all introduce ourselves. I\'ll go first!\n\nI\'m Jane, a software developer from San Francisco. I enjoy hiking, photography, and learning new technologies. Looking forward to connecting with all of you!',
        timestamp: '1 day ago',
        upvoteCount: 18,
      },
      {
        id: 'post-9',
        author: {
          id: 'user-2',
          username: 'JohnSmith',
          joinDate: 'Feb 2023',
        },
        content: 'Hey there! I\'m John from London. I work in UX design and love creating user-friendly interfaces. In my spare time, I enjoy playing guitar and cooking. Nice to meet you all!',
        timestamp: '20 hours ago',
        upvoteCount: 10,
        parentId: 'post-8',
      },
      {
        id: 'post-10',
        author: {
          id: 'user-3',
          username: 'NewUser',
          joinDate: 'Apr 2023',
        },
        content: 'Hi everyone! I\'m new here. I\'m a college student studying computer science. I\'m interested in AI and machine learning. Looking forward to learning from this community!',
        timestamp: '10 hours ago',
        upvoteCount: 7,
        parentId: 'post-8',
      },
    ],
  },
};

// Recursive function to build a thread tree
function buildThreadTree(posts: Post[], parentId: string | null = null, level = 0): ThreadPostWithChildren[] {
  return posts
    .filter(post => post.parentId === parentId)
    .map(post => {
      const children = buildThreadTree(posts, post.id, level + 1);
      return { ...post, children, level };
    });
}

// Component that renders a thread post and its replies recursively
function ThreadPostWithReplies({ post, onReply }: { post: ThreadPostWithChildren, onReply: (postId: string) => void }) {
  return (
    <>
      <ThreadPost
        id={post.id}
        author={post.author}
        content={post.content}
        timestamp={post.timestamp}
        upvoteCount={post.upvoteCount}
        isOriginalPost={post.level === 0}
        nestingLevel={post.level}
        onReply={onReply}
      />
      {post.children.map((child) => (
        <ThreadPostWithReplies key={child.id} post={child} onReply={onReply} />
      ))}
    </>
  );
}

export default function ThreadPage({ params }: { params: { id: string, threadId: string } }) {
  const { id: categoryId, threadId } = params;
  const thread = threads[threadId];
  
  // Server component workaround - in a real app, this would be a client component
  const handleReply = (postId: string) => {
    console.log(`Reply to post ${postId}`);
    // In a real application, this would open a reply form
  };
  
  if (!thread) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h1 className="text-2xl font-bold text-text mb-4">Thread Not Found</h1>
            <p className="text-subtle-text mb-6">The thread you're looking for doesn't exist or has been removed.</p>
            <Link href="/" className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Build the thread tree
  const threadPosts = thread.posts || [];
  const threadTree = buildThreadTree(threadPosts);
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="text-subtle-text hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-subtle-text">/</span>
            <Link href={`/category/${categoryId}`} className="text-subtle-text hover:text-primary transition-colors">
              {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
            </Link>
            <span className="text-subtle-text">/</span>
            <span className="text-text font-medium">Thread</span>
          </div>
          
          <h1 className="text-2xl font-bold text-text">{thread.title}</h1>
        </div>
        
        <div className="mb-8">
          {threadTree.map(post => (
            <ThreadPostWithReplies key={post.id} post={post} onReply={handleReply} />
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-border p-4">
          <h3 className="font-semibold text-text mb-4">Post a Reply</h3>
          <textarea 
            className="w-full border border-border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-32"
            placeholder="Write your reply here..."
          ></textarea>
          <div className="mt-3 flex justify-end">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Post Reply
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 