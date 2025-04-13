import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

// Types
type Category = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
};

// Mock categories data
const categories: Record<string, Category> = {
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

export default function NewThreadPage({ params }: { params: { id: string } }) {
  const { id: categoryId } = params;
  const category = categories[categoryId];
  
  // This would be a client component in a real app
  const handleSubmit = () => {
    // Form submission logic would go here
    console.log('Form submitted');
  };
  
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
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="text-subtle-text hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-subtle-text">/</span>
            <Link href={`/category/${categoryId}`} className="text-subtle-text hover:text-primary transition-colors">
              {category.name}
            </Link>
            <span className="text-subtle-text">/</span>
            <span className="text-text font-medium">New Thread</span>
          </div>
          
          <h1 className="text-2xl font-bold text-text">Create a New Thread</h1>
          <p className="text-subtle-text mt-1">in {category.name}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="p-6">
            <form>
              <div className="mb-6">
                <label htmlFor="title" className="block font-medium text-text mb-1">
                  Thread Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter a descriptive title"
                  className="w-full px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
                <p className="text-sm text-subtle-text mt-1">
                  Be specific and clear about the topic of your thread
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="tags" className="block font-medium text-text mb-1">
                  Tags (optional)
                </label>
                <input
                  type="text"
                  id="tags"
                  placeholder="Add tags separated by commas"
                  className="w-full px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-sm text-subtle-text mt-1">
                  Add up to 5 tags to help categorize your thread
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="content" className="block font-medium text-text mb-1">
                  Content
                </label>
                <div className="border border-border rounded-md">
                  <div className="flex border-b border-border bg-secondary text-subtle-text text-sm">
                    <button type="button" className="p-2 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
                      </svg>
                    </button>
                    <button type="button" className="p-2 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </button>
                    <button type="button" className="p-2 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </button>
                    <button type="button" className="p-2 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button type="button" className="p-2 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                  <textarea
                    id="content"
                    rows={10}
                    placeholder="Write your thread content here..."
                    className="w-full p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                    required
                  ></textarea>
                </div>
                <p className="text-sm text-subtle-text mt-1">
                  You can use markdown for formatting. Supported: **bold**, *italic*, [links](url), etc.
                </p>
              </div>
              
              <div className="flex justify-end gap-3">
                <Link href={`/category/${categoryId}`} className="px-4 py-2 rounded-md border border-border text-text hover:bg-secondary transition-colors">
                  Cancel
                </Link>
                <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 