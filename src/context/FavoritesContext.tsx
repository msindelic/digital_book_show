import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BookVolume, FavoriteBook } from '../types/book';
import { getBookCover, getAuthors } from '../services/booksApi';

interface FavoritesContextType {
  favorites: FavoriteBook[];
  isFavorite: (id: string) => boolean;
  addFavorite: (book: BookVolume) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (book: BookVolume) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);
const STORAGE_KEY = 'digital-book-show-favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteBook[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback((id: string) => favorites.some(f => f.id === id), [favorites]);

  const addFavorite = useCallback((book: BookVolume) => {
    const fav: FavoriteBook = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || ['Unknown'],
      thumbnail: getBookCover(book),
      publishedDate: book.volumeInfo.publishedDate || '',
      addedAt: Date.now(),
    };
    setFavorites(prev => [fav, ...prev.filter(f => f.id !== book.id)]);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }, []);

  const toggleFavorite = useCallback((book: BookVolume) => {
    if (isFavorite(book.id)) removeFavorite(book.id);
    else addFavorite(book);
  }, [isFavorite, addFavorite, removeFavorite]);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
