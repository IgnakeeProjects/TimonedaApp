'use client';
import Image from 'next/image';
import Link from 'next/link';

export type EventCardProps = {
  id: string;
  message: string;
  imageSrc: string;  
  href: string;
  source: 'facebook' | 'instagram';
  venue?: string | null;
  publishedTime?: string | null;
};

function FacebookIcon() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="#1877F2"
      className="transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-lg"
    >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);
}

function InstagramIcon() {
  return (
    <svg 
      viewBox="0 0 24 24"
      className="transition-all duration-300 group-hover:scale-125 group-hover:-rotate-12 group-hover:drop-shadow-lg"
    >
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="5%" stopColor="#fdf497"/>
          <stop offset="45%" stopColor="#fd5949"/>
          <stop offset="60%" stopColor="#d6249f"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

// Forzar locale/zonahoraria para evitar mismatch SSR/cliente
const LOCALE = 'es-ES';
const TIME_ZONE = 'Europe/Madrid';

// Helper para formatear fecha/hora en el idioma del usuario
function formatDateTime(input?: string | null): string | null {
  if (!input) return null;
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input; // fallback: mostrar tal cual si es inválida
  const locale = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'es-ES';
  return new Intl.DateTimeFormat(LOCALE, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: TIME_ZONE,
  }).format(date);
}

type Props = EventCardProps & { /* ... */ };

export default function EventCard({
  imageSrc,  
  href = '#',
  venue,
  message,  
  publishedTime,  
  source,
}: EventCardProps) {
  const clickable = href && href !== '#'; 

  const Media = (
    <div className="event-media relative">      
      <Image src={imageSrc} alt='' fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
      {/* Overlay oscuro en hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      <span className="platform-chip" aria-label={source}>
        {source === 'facebook' ? <FacebookIcon /> : <InstagramIcon />}
      </span>      
    </div>
  );

  // Formato legible para la fecha/hora
  const formattedDate = formatDateTime(publishedTime);
  const dateTimeAttr = (() => {
    if (!publishedTime) return undefined;
    const d = new Date(publishedTime);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
  })();

  return (
    <article className="event-card group">
      {clickable ? (
        <Link href={href} className="block h-full">
          {Media}
          <div className="event-body">
            {venue && (
              <div className="event-venue">
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-500" fill="currentColor" aria-hidden="true">
                  <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10z"/>
                </svg>
                <span>{venue}</span>
              </div>
            )}
            <h3 className="event-title line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">{message}</h3> 
            {formattedDate && (
              <time className="event-date" dateTime={dateTimeAttr}>
                {formattedDate}
              </time>
            )}
          </div>
        </Link>
      ) : (
        <div className="block h-full">
          {Media}
          <div className="event-body">
            {venue && (
              <div className="event-venue">
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-500" fill="currentColor" aria-hidden="true">
                  <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10z"/>
                </svg>
                <span>{venue}</span>
              </div>
            )}
            <h3 className="event-title line-clamp-2">{message}</h3> 
            {formattedDate && (
              <time className="event-date" dateTime={dateTimeAttr}>
                {formattedDate}
              </time>
            )}
          </div>
        </div>
      )}
    </article>
  );
}