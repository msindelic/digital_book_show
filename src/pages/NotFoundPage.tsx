import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-mono text-ink-300 text-8xl font-bold mb-6">404</p>
        <h1 className="font-display font-black text-ink-900 text-3xl mb-3">Page not found</h1>
        <p className="text-ink-400 font-body mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink-800 text-paper-50 rounded-sm text-sm font-medium hover:bg-ink-700 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
