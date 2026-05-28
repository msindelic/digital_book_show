import React from 'react';

export function BookCardSkeleton() {
  return (
    <div className="bg-paper-50 border border-ink-100 rounded-sm overflow-hidden">
      <div className="aspect-[3/4] shimmer" />
      <div className="p-3 border-t border-ink-100/60 space-y-2">
        <div className="h-4 shimmer rounded w-4/5" />
        <div className="h-3 shimmer rounded w-3/5" />
        <div className="h-3 shimmer rounded w-1/4" />
      </div>
    </div>
  );
}

export function BookDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-16 animate-pulse">
      <div className="grid md:grid-cols-[280px_1fr] gap-12">
        <div className="aspect-[3/4] shimmer rounded-sm" />
        <div className="space-y-4 pt-4">
          <div className="h-10 shimmer rounded w-3/4" />
          <div className="h-5 shimmer rounded w-1/2" />
          <div className="h-4 shimmer rounded w-1/4" />
          <div className="space-y-2 pt-4">
            <div className="h-3 shimmer rounded" />
            <div className="h-3 shimmer rounded" />
            <div className="h-3 shimmer rounded w-4/5" />
            <div className="h-3 shimmer rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
