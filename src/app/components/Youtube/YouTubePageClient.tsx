'use client';
import { useEffect, useRef, useState } from 'react';
import YouTubePlayer from '../../components/YouTubeplayer/YouTubePlayer';
import YouTubeGallery from '../../components/YouTubeGallery/YoutubeGallery';
import type { YTVideo } from '../../lib/youtube';
import Image from 'next/image';

type Props = {
  initialSelectedId: string | null;
  playlistId: string;
  initialItems: YTVideo[];
  initialNextPageToken?: string | null;
  liveActive?: boolean;
};

export default function YouTubePageClient({
  initialSelectedId,
  playlistId,
  initialItems,
  initialNextPageToken,
  liveActive,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId);
  const [items, setItems] = useState<YTVideo[]>(initialItems);
  const [nextToken, setNextToken] = useState<string | null | undefined>(initialNextPageToken);
  const [isLoading, setIsLoading] = useState(false);
  const hasMore = Boolean(nextToken);
  

  async function loadMore() {
    if (!nextToken || isLoading) return;
    
    setIsLoading(true);
    try {
      const url = new URL('/api/youtube/playlist', window.location.origin);
      url.searchParams.set('playlistId', playlistId);
      url.searchParams.set('pageToken', nextToken);
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        console.error('Error al cargar más videos');
        return;
      }
      const data = await res.json();
      
      // Filtrar duplicados y actualizar
      setItems(prev => {
        const existingIds = new Set(prev.map(v => v.id));
        const newItems = (data.items || []).filter((v: YTVideo) => !existingIds.has(v.id));
        console.log('Videos existentes:', prev.length);
        console.log('Videos nuevos después de filtrar:', newItems.length);
        return [...prev, ...newItems];
      });
      
      setNextToken(data.nextPageToken || null);
    } catch (error) {
      console.error('Error en loadMore:', error);
    } finally {
      setIsLoading(false);
    }
  }



  const current = items.find(v => v.id === selectedId) || null;

  return (
    <>
        {/* Contenedor con referencia para calcular altura */}
      <div className="yt-container-equal">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player */}
          <section className="lg:col-span-2">
            <div className="relative aspect-video rounded-2xl bg-white p-3 ring-1 ring-black/5 shadow">
              <YouTubePlayer videoId={selectedId || undefined} autoplay />
              {liveActive && (
                <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-red-600 text-white text-xs font-semibold px-3 py-1 shadow z-10">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  EN VIVO
                </span>
              )}
            </div>
          </section>

          {/* Galería con altura controlada por CSS */}
          <aside className="hidden lg:block lg:col-span-1 w-full">
            <div className="yt-gallery-equal rounded-2xl bg-white p-3 ring-1 ring-black/5 shadow flex flex-col gap-3 overflow-hidden">
              <h3 className="events-title text-lg font-bold text-left flex-shrink-0">Videos anteriores</h3>
              
              {/* Lista con scroll */}
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-2 space-y-3 yt-scrollbar-thin">
                {items.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedId(v.id)}
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

              {/* Botón fijo */}
              {hasMore && (
                <button
                  onClick={loadMore}
                  disabled={!hasMore || isLoading}
                  className="flex-shrink-0 w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-3 py-2 text-sm font-medium shadow hover:bg-indigo-700 disabled:opacity-40 transition"
                >
                  {isLoading ? 'Cargando...' : hasMore ? 'Cargar más' : 'No hay más videos'}
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Meta del video */}
      {current && (
        <div className="mt-3">
          <h2 className="events-title text-xl font-bold leading-snug">{current.title}</h2>
          {current.publishedAt && (
            <p className="text-sm text-gray-500 mt-1">
              {new Intl.DateTimeFormat('es-ES', {
                dateStyle: 'long',
                timeStyle: 'short',
                timeZone: 'Europe/Madrid',
              }).format(new Date(current.publishedAt))}
            </p>
          )}
        </div>
      )}
    </>
    );
}