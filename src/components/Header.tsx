import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline'; // Example icons

const Header: React.FC = () => {
  // Placeholder state for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const navigate = useNavigate(); // Hook for navigation

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // Don't search if query is empty
    
    console.log('Search submitted:', searchQuery);
    // TODO: Implement actual search logic
    // Option 1: Navigate to a dedicated search results page
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    
    // Option 2: Trigger an API call and display results in a dropdown (more complex)
    
    setSearchQuery(''); // Optional: Clear search bar after submit
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          ForumLogo
        </Link>

        {/* Search Form (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forums..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              aria-label="Search forums"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-subtle" />
          </div>
        </form>

        {/* User Controls (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Placeholder for Category Dropdown */}
          <button className="text-text-subtle hover:text-text-primary">Categories</button>
          <button className="text-text-subtle hover:text-text-primary">
            <UserCircleIcon className="h-6 w-6" />
          </button>
          {/* Login/Register or User Profile Link */} 
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-subtle hover:text-text-primary"
            aria-label="Toggle menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-2">
          {/* Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative mb-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forums..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              aria-label="Search forums"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-subtle" />
            {/* Hidden submit button to allow enter key submission */}
            <button type="submit" className="hidden">Search</button> 
          </form>
          {/* Mobile Links */} 
          <a href="#" className="block py-2 text-text-primary hover:bg-secondary">Categories</a>
          <a href="#" className="block py-2 text-text-primary hover:bg-secondary">Profile</a>
          {/* Add more mobile links as needed */}
        </div>
      )}
    </header>
  );
};

export default Header; 