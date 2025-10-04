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
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <path fill="#1877F2" d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.093 10.125 24v-8.437H7.078V12.07h3.047V9.412c0-3.008 1.792-4.667 4.533-4.667 1.313 0 2.686.235 2.686.235v2.953h-1.514c-1.492 0-1.956.93-1.956 1.885v2.252h3.328l-.532 3.492h-2.796V24C19.612 23.093 24 18.1 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <radialGradient id="igGrad" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stopColor="#feda75"/><stop offset="50%" stopColor="#d62976"/><stop offset="100%" stopColor="#4f5bd5"/>
      </radialGradient>
      <path fill="url(#igGrad)" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"/>
      <path fill="#fff" d="M12 7.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 1 0 12 7.5zm0-1.5a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm6.8-.2a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z"/>
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
    <div className="event-media">
      <Image src={imageSrc} alt='' fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
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
    <article className="event-card">
      {clickable ? <Link href={href} className="block">{Media}</Link> : <div className="block">{Media}</div>}
            

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
    </article>
  );
}