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
      <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-white/90 border border-gray-200 text-gray-700">
        {source === 'facebook' ? 'Facebook' : 'Instagram'}
      </div>

      <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/90 border border-gray-200">
      <Image
        src={source === 'facebook' ? '/icons/facebook.svg' : '/icons/instagram.svg'}
        alt=''
        width={16}
        height={16}
        className="inline-block"
      />
    </div>


      <button className="wishlist-btn" type="button" aria-label="Guardar evento">
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-700" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
        </svg>
      </button>
    </div>
  );

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
        {publishedTime && <div className="event-date">{publishedTime}</div>}
        
      </div>      
    </article>
  );
}