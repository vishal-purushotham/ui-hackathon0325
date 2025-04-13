import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-text-subtle text-sm">
        © {new Date().getFullYear()} Forum Name. All rights reserved.
        {/* Add other footer links if needed */}
      </div>
    </footer>
  );
};

export default Footer; 