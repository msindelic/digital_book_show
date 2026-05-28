import { BookVolume, GoogleBooksResponse } from '../types/book';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function searchBooks(
  query: string,
  startIndex: number = 0,
  maxResults: number = 12,
): Promise<{ books: BookVolume[]; totalItems: number }> {
  if (!query.trim()) return { books: [], totalItems: 0 };

  const params = new URLSearchParams({
    q: query,
    startIndex: startIndex.toString(),
    maxResults: maxResults.toString(),
    key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
    printType: 'books',
    langRestrict: 'en',
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);

  const data: GoogleBooksResponse = await response.json();
  return {
    books: data.items || [],
    totalItems: data.totalItems || 0,
  };
}

export async function getBookById(id: string): Promise<BookVolume> {
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  // Append the key if it exists, otherwise just fetch without it
  const url = apiKey ? `${BASE_URL}/${id}?key=${apiKey}` : `${BASE_URL}/${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(
        'Too many requests. Please wait a few minutes and try again.',
      );
    }
    throw new Error(`Book not found: ${response.status}`);
  }
  return response.json();
}

export function getBookCover(
  book: BookVolume,
  size: 'small' | 'medium' | 'large' = 'medium',
): string {
  const links = book.volumeInfo.imageLinks;
  if (!links) return '';

  const sizeMap = {
    small: links.smallThumbnail || links.thumbnail || '',
    medium: links.thumbnail || links.smallThumbnail || '',
    large: links.large || links.medium || links.small || links.thumbnail || '',
  };

  // Force HTTPS
  return (sizeMap[size] || '').replace('http://', 'https://');
}

export function getAuthors(book: BookVolume): string {
  return book.volumeInfo.authors?.join(', ') || 'Unknown Author';
}

export function getYear(book: BookVolume): string {
  const date = book.volumeInfo.publishedDate;
  if (!date) return '';
  return date.split('-')[0];
}
