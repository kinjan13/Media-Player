import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedSearch(searchFunction, delay = 300) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(searchQuery, delay);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      const performSearch = async () => {
        setIsSearching(true);
        setError(null);

        try {
          const data = await searchFunction(debouncedQuery);
          setResults(data);
        } catch (err) {
          setError(err.message || 'Search failed');
          setResults([]);
        } finally {
          setIsSearching(false);
        }
      };

      performSearch();
    } else {
      setResults([]);
      setError(null);
      setIsSearching(false);
    }
  }, [debouncedQuery, searchFunction]);

  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    results,
    error
  };
}