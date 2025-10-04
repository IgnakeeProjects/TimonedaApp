'use client';
import Image from 'next/image';
import { YTVideo } from '../../lib/youtube';

type Props = {
  items: YTVideo[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
};

export default function YouTubeGallery({ items, selectedId, onSelect, onLoadMore, hasMore }: Props) {
  return (
    <div className="">
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-2 space-y-3 yt-scrollbar-thin">
        {items.map(v => (
          <button
            key={v.id}
            onClick={() => onSelect(v.id)}
            className={`w-full text-left rounded-lg overflow-hidden ring-1 ring-black/5 shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${selectedId === v.id ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="relative aspect-video">
              <Image
                src={v.thumbnail}
                alt={v.title}
                fill
                sizes="(min-width:1024px) 25vw, 50vw"
                className="object-cover"
              />              
            </div>
            <div className="p-2">
              <h4 className="text-sm font-medium line-clamp-2">{v.title}</h4>
              {v.publishedAt && (
                <p className="mt-1 text-xs text-zinc-500">
                  {new Intl.DateTimeFormat('es-ES', { dateStyle: 'short' }).format(new Date(v.publishedAt))}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {onLoadMore && (
        <div className="pt-3 flex-shrink-0">
          <button
            onClick={onLoadMore}
            disabled={!hasMore}
            className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-indigo-700 disabled:opacity-40"
          >
            {hasMore ? 'Cargar más' : 'No hay más videos'}
          </button>
        </div>
      )}
    </div>
  );
}