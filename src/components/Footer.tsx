import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-paper-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-ink-800 text-lg">Digital Book Show</p>
            <p className="text-ink-400 text-xs mt-1 font-body">Powered by Google Books API</p>
          </div>

          <nav className="flex items-center gap-6">
            {[
              { to: 'https://github.com/msindelic', label: 'GitHub' },
              { to: 'https://www.linkedin.com/in/msindelic84', label: 'Linkedin' },
              { to: 'https://x.com/mihailosindelic', label: 'Twitter' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-ink-400 hover:text-ink-800 transition-colors font-body"
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-ink-300 font-mono">
            © {new Date().getFullYear()} Digital Book Show
          </p>
        </div>
      </div>
    </footer>
  );
}
