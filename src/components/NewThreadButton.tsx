import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

interface NewThreadButtonProps {
  onClick?: () => void; // Optional click handler
}

const NewThreadButton: React.FC<NewThreadButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
    >
      <PlusIcon className="w-5 h-5" aria-hidden="true" />
      <span>New Thread</span>
    </button>
  );
};

export default NewThreadButton; 