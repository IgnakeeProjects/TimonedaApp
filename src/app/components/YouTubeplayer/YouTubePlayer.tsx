'use client';
import { useMemo } from 'react';

type Props = {
  videoId?: string | null;
  autoplay?: boolean;
  className?: string;
};

export default function YouTubePlayer({ videoId, autoplay = true, className = '' }: Props) {
  const src = useMemo(() => {
    if (!videoId) return null;
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      color: 'white',
      iv_load_policy: '3',
      playsinline: '1',
      autoplay: autoplay ? '1' : '0',
      mute: '0',
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }, [videoId, autoplay]);

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-xl ring-1 ring-black/5 shadow ${className}`}>
      {src ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={src}
          title="YouTube player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center text-zinc-500">
          Sin video seleccionado
        </div>
      )}
    </div>
  );
}