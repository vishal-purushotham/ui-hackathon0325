import React from 'react';
import { useSearchParams, Link as _Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // TODO: Add loading/error states
  // TODO: Implement actual search API call based on 'query'
  // TODO: Define structure for search results (e.g., Thread or Post items)
  const isLoading = false; // Placeholder
  const error = null; // Placeholder
  const results: any[] = []; // Placeholder for search results array

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Search Results for: <span className="text-primary">"{query}"</span>
      </h1>

      {isLoading && <div className="text-center p-6 text-text-subtle">Loading results...</div>}
      
      {error && <div className="text-center p-6 text-red-600">Error loading results. Please try again.</div>}
      
      {!isLoading && !error && (
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((_result, index) => (
              // TODO: Render actual result items (e.g., ThreadItem, PostItem, or a dedicated SearchResultItem)
              <div key={index} className="p-4 bg-white border border-border rounded-lg shadow-sm">
                Placeholder for result {index + 1}...
              </div>
            ))
          ) : (
            <div className="text-center p-10 bg-white border border-border rounded-lg shadow-sm text-text-subtle">
              <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-1">No results found</h3>
              <p>We couldn't find anything matching "{query}".</p>
              <p className="text-sm mt-2">Try searching for something else.</p>
            </div>
          )}
        </div>
      )}

      {/* TODO: Add pagination for search results */}
    </div>
  );
};

export default SearchResultsPage; 