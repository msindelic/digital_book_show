import React from 'react';
import { Link } from 'react-router-dom';
import { BookVolume } from '../types/book';
import { getBookCover, getAuthors, getYear } from '../services/booksApi';
import { useFavorites } from '../context/FavoritesContext';

interface BookCardProps {
  book: BookVolume;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const cover = getBookCover(book);
  const authors = getAuthors(book);
  const year = getYear(book);
  const title = book.volumeInfo.title;
  const fav = isFavorite(book.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(book);
  };

  // Spine color palette based on index
  const spineColors = [
    'bg-ink-700', 'bg-accent-red', 'bg-accent-teal', 
    'bg-ink-500', 'bg-amber-700', 'bg-slate-700',
  ];
  const spineColor = spineColors[index % spineColors.length];

  return (
    <Link to={`/book/${book.id}`} className="block group">
      <article className="book-card bg-paper-50 border border-ink-100 rounded-sm overflow-hidden">
        {/* Cover */}
        <div className="relative aspect-[3/4] overflow-hidden bg-paper-200">
          {/* Spine accent */}
          <div className={`absolute left-0 top-0 bottom-0 w-2 ${spineColor} z-10`} />
          
          {cover ? (
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-paper-200 to-paper-300">
              <div className={`w-8 h-1 ${spineColor} mb-4 rounded-full`} />
              <p className="font-display font-bold text-ink-700 text-center text-sm leading-tight line-clamp-4">
                {title}
              </p>
              <div className={`w-4 h-0.5 ${spineColor} mt-4 rounded-full`} />
            </div>
          )}

          {/* Favourite button */}
          <button
            onClick={handleFavorite}
            className={`absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
              fav 
                ? 'bg-accent-red text-white scale-110' 
                : 'bg-paper-50/90 text-ink-400 opacity-0 group-hover:opacity-100 hover:text-accent-red'
            }`}
            aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
          >
            <svg className="w-4 h-4" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Rating badge */}
          {book.volumeInfo.averageRating && (
            <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1 bg-paper-50/90 rounded-sm px-1.5 py-0.5">
              <svg className="w-3 h-3 text-accent-gold fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-ink-700 text-xs font-mono font-medium">
                {book.volumeInfo.averageRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 border-t border-ink-100/60">
          <h3 className="font-display font-semibold text-ink-900 text-sm leading-tight line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-ink-400 text-xs font-body line-clamp-1">{authors}</p>
          {year && (
            <p className="text-ink-300 text-xs font-mono mt-1">{year}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
