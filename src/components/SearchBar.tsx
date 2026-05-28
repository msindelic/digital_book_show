import React, { useState, useRef, useEffect } from 'react';
import {useDebounce} from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SearchBar({
  onSearch,
  initialValue = '',
  placeholder = 'Search for books, authors, ISBN…',
  autoFocus = false,
  size = 'md',
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, 300);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedValue.trim()) onSearch(debouncedValue.trim());
  };

  const handleClear = () => {
    setValue('');
    inputRef.current?.focus();
  };

  const sizeClasses = {
    sm: 'h-10 text-sm px-4',
    md: 'h-12 text-sm px-5',
    lg: 'h-14 text-base px-6',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  return (
    <form onSubmit={handleSubmit} className='relative w-full group'>
      <div className='relative flex items-center'>
        {/* Search icon */}
        <div className='absolute left-4 text-ink-400 pointer-events-none z-10 transition-colors group-focus-within:text-ink-700'>
          <svg
            className={iconSizes[size]}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full ${sizeClasses[size]} pl-12 pr-24
            bg-white border-2 border-ink-200 rounded-sm
            font-body text-ink-900 placeholder-ink-300
            focus:outline-none focus:border-ink-700
            transition-all duration-200
            shadow-sm focus:shadow-md
          `}
        />

        {/* Clear button */}
        {value && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute right-16 text-ink-300 hover:text-ink-600 transition-colors p-1'
          >
            <svg
              className={iconSizes[size]}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}

        {/* Submit */}
        <button
          type='submit'
          disabled={!value.trim()}
          className={`
            absolute right-2 ${size === 'lg' ? 'h-10 px-4' : 'h-8 px-3'}
            bg-ink-800 hover:bg-ink-700 disabled:bg-ink-200
            text-paper-50 disabled:text-ink-400
            text-xs font-medium font-body rounded-sm
            transition-all duration-200
          `}
        >
          Search
        </button>
      </div>
    </form>
  );
}
