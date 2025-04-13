'use client';

import Link from 'next/link';
import { SearchIcon, MenuIcon, UserIcon, BellIcon } from './Icons';
import { useState } from 'react';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl text-primary">
            Forum
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-8 space-x-6">
            <Link href="/" className="text-text hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="text-text hover:text-primary transition-colors font-medium flex items-center gap-1">
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link href="/category/general" className="block px-4 py-2 text-sm text-text hover:bg-secondary">
                  General Discussion
                </Link>
                <Link href="/category/announcements" className="block px-4 py-2 text-sm text-text hover:bg-secondary">
                  Announcements
                </Link>
                <Link href="/category/help" className="block px-4 py-2 text-sm text-text hover:bg-secondary">
                  Help & Support
                </Link>
              </div>
            </div>
            <Link href="/members" className="text-text hover:text-primary transition-colors font-medium">
              Members
            </Link>
          </nav>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-border bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-text">
              <SearchIcon className="h-5 w-5" />
            </div>
            <button type="submit" className="sr-only">Search</button>
          </form>
        </div>
        
        {/* User Controls */}
        <div className="flex items-center space-x-4">
          <Link href="/search" className="p-2 text-subtle-text hover:text-primary rounded-full hover:bg-secondary transition-colors md:hidden">
            <SearchIcon className="h-5 w-5" />
          </Link>
          <button className="p-2 text-subtle-text hover:text-primary rounded-full hover:bg-secondary transition-colors">
            <BellIcon className="h-5 w-5" />
          </button>
          <Link href="/profile/user-1" className="p-2 text-subtle-text hover:text-primary rounded-full hover:bg-secondary transition-colors">
            <UserIcon className="h-5 w-5" />
          </Link>
          <button className="md:hidden p-2 text-subtle-text hover:text-primary rounded-full hover:bg-secondary transition-colors">
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
} 