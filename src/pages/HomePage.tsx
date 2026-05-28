import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { BookCardSkeleton } from '../components/Skeleton';
import { searchBooks } from '../services/booksApi';
import { BookVolume } from '../types/book';

const FEATURED_QUERIES = ['classic literature', 'science fiction', 'history', 'philosophy'];
const CURATED = ['To Kill a Mockingbird', 'Dune', 'Sapiens', '1984', 'The Great Gatsby', 'Cosmos'];

export default function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<BookVolume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = FEATURED_QUERIES[Math.floor(Math.random() * FEATURED_QUERIES.length)];
    searchBooks(query, 0, 8)
      .then(({ books }) => setFeatured(books))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="hero-bg pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Ornamental header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-ink-300" />
            <span className="text-ink-400 text-xs font-mono uppercase tracking-[0.25em]">Est. 2025</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-ink-300" />
          </div>

          <h1 className="font-display font-black text-ink-900 leading-none mb-6">
            <span className="block text-5xl sm:text-7xl">Digital</span>
            <span className="block text-5xl sm:text-7xl italic text-ink-400">Book Show</span>
          </h1>

          <p className="text-ink-500 text-lg font-body mb-10 max-w-xl mx-auto leading-relaxed">
            Explore millions of books. Discover stories, knowledge, and worlds beyond imagination.
          </p>

          <div className="max-w-xl mx-auto">
            <SearchBar onSearch={handleSearch} size="lg" placeholder="Search by title, author, or topic…" autoFocus />
          </div>

          {/* Quick searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-ink-300 text-xs font-mono">Try:</span>
            {CURATED.map(title => (
              <button
                key={title}
                onClick={() => handleSearch(title)}
                className="px-3 py-1 bg-paper-200 hover:bg-paper-300 text-ink-600 hover:text-ink-900 rounded-sm text-xs font-body transition-colors border border-ink-100"
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="flex items-center gap-4 px-8 max-w-7xl mx-auto w-full py-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
        <span className="text-ink-300 text-sm">✦</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
      </div>

      {/* Featured Books */}
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-ink-900 text-2xl">Featured Books</h2>
            <p className="text-ink-400 text-sm mt-1 font-body">A curated selection, refreshed on every visit</p>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="text-sm text-ink-500 hover:text-ink-900 transition-colors font-body underline underline-offset-2"
          >
            Browse all →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5 stagger-children">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)
            : featured.map((book, i) => <BookCard key={book.id} book={book} index={i} />)
          }
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-ink-800 text-paper-50 py-12">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          {[
            { value: '40M+', label: 'Books' },
            { value: '120+', label: 'Languages' },
            { value: 'Free', label: 'Forever' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display font-black text-3xl text-paper-200">{value}</p>
              <p className="text-ink-300 text-sm font-body mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
