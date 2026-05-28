import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper-50/95 backdrop-blur-md shadow-sm border-b border-ink-100/40' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-ink-800 flex items-center justify-center rounded-sm rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <span className="text-paper-50 font-display font-bold text-sm">D</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-ink-900 text-lg leading-none">Digital</span>
              <span className="font-display text-ink-400 text-lg leading-none ml-1.5">Book Show</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/search', label: 'Search' },
              { path: '/favorites', label: 'Favourites' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
                  isActive(path) ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                {label}
                {label === 'Favourites' && favorites.length > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 bg-accent-red text-white text-xs rounded-full font-mono">
                    {favorites.length > 9 ? '9+' : favorites.length}
                  </span>
                )}
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-ink-800 transition-transform duration-200 origin-left ${
                  isActive(path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </div>

          {/* Search icon + Mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/search')}
              className="p-2 text-ink-500 hover:text-ink-900 transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-ink-500 hover:text-ink-900 transition-colors"
              aria-label="Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-ink-100 bg-paper-50/98 backdrop-blur-md">
            {[
              { path: '/', label: 'Home' },
              { path: '/search', label: 'Search' },
              { path: '/favorites', label: `Favourites${favorites.length > 0 ? ` (${favorites.length})` : ''}` },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-6 py-3 text-sm font-medium border-b border-ink-100/50 transition-colors ${
                  isActive(path) ? 'text-ink-900 bg-paper-200/50' : 'text-ink-600 hover:text-ink-900 hover:bg-paper-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
