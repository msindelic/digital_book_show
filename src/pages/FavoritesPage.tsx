import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { FavoriteBook } from '../types/book';

function FavCard({ book, onRemove }: { book: FavoriteBook; onRemove: () => void }) {
  const year = book.publishedDate?.split('-')[0] || '';

  return (
    <div className="group flex gap-4 bg-paper-50 border border-ink-100 rounded-sm p-4 hover:shadow-md transition-shadow">
      <Link to={`/book/${book.id}`} className="flex-shrink-0">
        <div className="w-16 h-24 overflow-hidden rounded-sm shadow bg-paper-200">
          {book.thumbnail ? (
            <img src={book.thumbnail.replace('http://', 'https://')} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-paper-200 to-paper-300">
              <span className="text-ink-400 text-xs text-center px-1 font-display">📖</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/book/${book.id}`}>
          <h3 className="font-display font-semibold text-ink-900 text-base leading-tight hover:text-ink-600 transition-colors line-clamp-2">
            {book.title}
          </h3>
        </Link>
        <p className="text-ink-500 text-sm font-body mt-1 line-clamp-1">
          {book.authors.join(', ')}
        </p>
        {year && <p className="text-ink-300 text-xs font-mono mt-1">{year}</p>}
        <p className="text-ink-300 text-xs font-mono mt-2">
          Added {new Date(book.addedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>

      <button
        onClick={onRemove}
        className="flex-shrink-0 text-ink-200 hover:text-accent-red transition-colors p-1 opacity-0 group-hover:opacity-100"
        aria-label="Remove from favourites"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-ink-300" />
            <span className="text-ink-400 text-xs font-mono uppercase tracking-widest">Your Collection</span>
          </div>
          <h1 className="font-display font-black text-ink-900 text-4xl">Favourites</h1>
          {favorites.length > 0 && (
            <p className="text-ink-400 font-body mt-2">
              <span className="font-mono text-ink-700">{favorites.length}</span> {favorites.length === 1 ? 'book' : 'books'} saved
            </p>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-ink-200 rounded-sm bg-paper-100">
            <div className="text-5xl mb-4 opacity-30">🤍</div>
            <h3 className="font-display font-bold text-ink-800 text-xl mb-2">No favourites yet</h3>
            <p className="text-ink-400 font-body mb-6">
              Search for books and tap the heart icon to save them here.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink-800 text-paper-50 rounded-sm text-sm font-medium hover:bg-ink-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="space-y-3 stagger-children">
            {favorites.map(book => (
              <FavCard
                key={book.id}
                book={book}
                onRemove={() => removeFavorite(book.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
