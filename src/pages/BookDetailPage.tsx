import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookVolume } from '../types/book';
import { getBookById } from '../services/booksApi';
import { getBookCover, getYear } from '../services/booksApi';
import { useFavorites } from '../context/FavoritesContext';
import { BookDetailSkeleton } from '../components/Skeleton';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [book, setBook] = useState<BookVolume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    getBookById(id)
      .then(setBook)
      .catch(() => setError('Could not load book details.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <BookDetailSkeleton />;

  if (error || !book) {
    return (
      <div className='min-h-screen pt-32 pb-16 px-4 text-center'>
        <p className='text-ink-500 font-body mb-4'>
          {error || 'Book not found.'}
        </p>
        <button
          onClick={() => navigate(-1)}
          className='text-ink-700 underline font-body'
        >
          Go back
        </button>
      </div>
    );
  }

  const info = book.volumeInfo;
  const cover = getBookCover(book, 'large');
  const fav = isFavorite(book.id);
  const desc = info.description?.replace(/<[^>]+>/g, '') || '';
  const shortDesc = desc.slice(0, 400);
  const needsExpand = desc.length > 400;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? 'text-accent-gold fill-current' : 'text-ink-200'}`}
        viewBox='0 0 20 20'
      >
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    ));
  };

  return (
    <div className='min-h-screen pt-24 pb-16'>
      {/* Back nav */}
      <div className='max-w-5xl mx-auto px-4 mb-6'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-ink-400 hover:text-ink-800 text-sm font-body transition-colors group'
        >
          <svg
            className='w-4 h-4 group-hover:-translate-x-1 transition-transform'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back
        </button>
      </div>

      <div className='max-w-5xl mx-auto px-4'>
        <div className='grid md:grid-cols-[280px_1fr] gap-10 lg:gap-16'>
          {/* Cover */}
          <div className='flex flex-col items-center md:items-start gap-4'>
            <div className='w-56 md:w-full max-w-[280px] shadow-2xl rounded-sm overflow-hidden ring-1 ring-ink-200'>
              {cover ? (
                <img src={cover} alt={info.title} className='w-full h-auto' />
              ) : (
                <div className='aspect-[3/4] bg-gradient-to-br from-paper-200 to-paper-300 flex items-center justify-center p-8'>
                  <p className='font-display font-bold text-ink-700 text-center text-lg'>
                    {info.title}
                  </p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className='flex flex-col gap-2 w-56 md:w-full max-w-[280px]'>
              <button
                onClick={() => toggleFavorite(book)}
                className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-sm text-sm font-medium transition-all duration-200 border ${
                  fav
                    ? 'bg-accent-red text-white border-accent-red hover:bg-red-700'
                    : 'bg-white text-ink-700 border-ink-200 hover:bg-paper-200 hover:border-ink-400'
                }`}
              >
                <svg
                  className='w-4 h-4'
                  fill={fav ? 'currentColor' : 'none'}
                  stroke='currentColor'
                  strokeWidth={2}
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
                {fav ? 'Remove Favourite' : 'Add to Favourites'}
              </button>

              {info.previewLink && (
                <a
                  href={info.previewLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center gap-2 w-full py-2.5 rounded-sm text-sm font-medium bg-ink-800 text-paper-50 hover:bg-ink-700 transition-colors'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                  Preview Book
                </a>
              )}
            </div>
          </div>

          {/* Details */}
          <div className='opacity-0 animate-[fadeUp_0.5s_ease_0.1s_forwards]'>
            {/* Categories */}
            {info.categories && (
              <div className='flex flex-wrap gap-2 mb-4'>
                {info.categories.slice(0, 3).map((cat) => (
                  <Link
                    key={cat}
                    to={`/search?q=${encodeURIComponent(cat)}`}
                    className='px-2.5 py-1 bg-paper-200 hover:bg-paper-300 text-ink-600 text-xs font-mono rounded-sm border border-ink-100 transition-colors'
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}

            <h1 className='font-display font-black text-ink-900 text-3xl sm:text-4xl leading-tight mb-3'>
              {info.title}
            </h1>

            {info.authors && (
              <p className='text-ink-500 font-body text-lg mb-2'>
                by{' '}
                {info.authors.map((author, i) => (
                  <span key={author}>
                    <Link
                      to={`/search?q=author:${encodeURIComponent(author)}`}
                      className='text-ink-700 hover:text-ink-900 transition-colors hover:underline'
                    >
                      {author}
                    </Link>
                    {i < (info.authors?.length || 0) - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}

            {/* Rating */}
            {info.averageRating && (
              <div className='flex items-center gap-2 mb-4'>
                <div className='flex'>{renderStars(info.averageRating)}</div>
                <span className='font-mono text-sm text-ink-700'>
                  {info.averageRating.toFixed(1)}
                </span>
                {info.ratingsCount && (
                  <span className='text-ink-400 text-sm font-body'>
                    ({info.ratingsCount.toLocaleString()} ratings)
                  </span>
                )}
              </div>
            )}

            {/* Meta grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 p-4 bg-paper-100 rounded-sm border border-ink-100'>
              {[
                {
                  label: 'Published',
                  value: info.publishedDate
                    ? getYear({ id: book.id, volumeInfo: info })
                    : '—',
                },
                { label: 'Publisher', value: info.publisher || '—' },
                {
                  label: 'Pages',
                  value: info.pageCount ? info.pageCount.toLocaleString() : '—',
                },
                {
                  label: 'Language',
                  value: info.language?.toUpperCase() || '—',
                },
                {
                  label: 'Maturity',
                  value: info.maturityRating?.replace('_', ' ') || '—',
                },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className='text-xs text-ink-400 font-mono uppercase tracking-wide'>
                    {label}
                  </p>
                  <p className='text-sm text-ink-800 font-body mt-0.5'>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            {desc && (
              <div>
                <h2 className='font-display font-bold text-ink-800 text-lg mb-3'>
                  About this book
                </h2>
                <p className='text-ink-600 font-body leading-relaxed text-base'>
                  {descExpanded || !needsExpand ? desc : `${shortDesc}…`}
                </p>
                {needsExpand && (
                  <button
                    onClick={() => setDescExpanded(!descExpanded)}
                    className='mt-2 text-sm text-ink-500 hover:text-ink-900 underline font-body transition-colors'
                  >
                    {descExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
