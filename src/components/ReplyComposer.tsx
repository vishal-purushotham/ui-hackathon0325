import React, { useState } from 'react';

interface ReplyComposerProps {
  onSubmit: (content: string) => void; // Callback when reply is submitted
  isSubmitting?: boolean; // Optional flag to show loading state
}

const ReplyComposer: React.FC<ReplyComposerProps> = ({ onSubmit, isSubmitting }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return; // Prevent empty submissions or double submits
    onSubmit(content);
    setContent(''); // Clear the textarea after submission
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mt-6 p-4 bg-white border border-border rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-medium text-text-primary mb-2">Post a Reply</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply here... Supports Markdown."
        className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-h-[100px] text-sm text-text-primary"
        rows={4}
        required
        disabled={isSubmitting}
        aria-label="Reply content"
      />
      <div className="mt-3 flex justify-end">
        <button 
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className={`
            bg-primary text-white px-4 py-2 rounded-md font-medium transition-colors 
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}
            ${!content.trim() ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? 'Submitting...' : 'Post Reply'}
        </button>
      </div>
    </form>
  );
};

export default ReplyComposer; 