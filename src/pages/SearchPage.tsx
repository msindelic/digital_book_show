import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { BookCardSkeleton } from '../components/Skeleton';
import { searchBooks } from '../services/booksApi';
import { BookVolume } from '../types/book';

const PAGE_SIZE = 12;

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [books, setBooks] = useState<BookVolume[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const doSearch = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const startIndex = (page - 1) * PAGE_SIZE;
      const result = await searchBooks(query, startIndex, PAGE_SIZE);
      setBooks(result.books);
      setTotalItems(Math.min(result.totalItems, 1000)); // Google Books caps at 1000
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => { doSearch(); }, [doSearch]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const handleSearch = (q: string) => {
    navigate(`/search?q=${encodeURIComponent(q)}&page=1`);
  };

  const goToPage = (p: number) => {
    navigate(`/search?q=${encodeURIComponent(query)}&page=${p}`);
  };

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }
    if (page - delta > 2) pages.push(1, '...');
    else pages.push(1);
    pages.push(...range);
    if (page + delta < totalPages - 1) pages.push('...', totalPages);
    else if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Search header */}
        <div className="mb-8">
          <div className="max-w-2xl">
            <SearchBar onSearch={handleSearch} initialValue={query} size="md" />
          </div>

          {query && !loading && (
            <div className="mt-3 flex items-center gap-3">
              <p className="text-ink-500 text-sm font-body">
                {totalItems > 0
                  ? <>Showing <span className="font-mono text-ink-800">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, totalItems)}</span> of <span className="font-mono text-ink-800">{totalItems.toLocaleString()}</span> results for <span className="font-display italic text-ink-900">"{query}"</span></>
                  : <>No results found for <span className="font-display italic text-ink-900">"{query}"</span></>
                }
              </p>
            </div>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-4 mb-8 text-center">
            <p className="text-red-700 text-sm font-body">{error}</p>
            <button onClick={doSearch} className="mt-2 text-sm text-red-600 underline">Retry</button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && query && books.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-30">📚</div>
            <h3 className="font-display font-bold text-ink-800 text-xl mb-2">No books found</h3>
            <p className="text-ink-400 font-body">Try a different search term or check the spelling.</p>
          </div>
        )}

        {/* No query */}
        {!query && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-30">🔍</div>
            <h3 className="font-display font-bold text-ink-800 text-xl mb-2">Search for books</h3>
            <p className="text-ink-400 font-body">Enter a title, author, ISBN, or topic above.</p>
          </div>
        )}

        {/* Grid */}
        {(loading || books.length > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 stagger-children">
            {loading
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => <BookCardSkeleton key={i} />)
              : books.map((book, i) => <BookCard key={book.id} book={book} index={i} />)
            }
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-12">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 text-sm font-body text-ink-500 hover:text-ink-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>

            {getPageNumbers().map((p, i) =>
              p === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 text-ink-300">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p as number)}
                  className={`w-9 h-9 rounded-sm text-sm font-mono transition-colors ${
                    p === page
                      ? 'bg-ink-800 text-paper-50'
                      : 'text-ink-500 hover:bg-paper-200 hover:text-ink-900'
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-2 text-sm font-body text-ink-500 hover:text-ink-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
