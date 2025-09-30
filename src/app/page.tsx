import HeroSlider from './components/HeroSlider/HeroSlider';
import EventSlider from './components/EventSlider/EventSlider';
import type { EventCardProps } from './components/EventCard/EventCard';
import './globals.css';
import { fetchFacebookEvents, fetchInstagramAsEvents } from './lib/social';

export const dynamic = 'force-dynamic';

async function getEvents(): Promise<EventCardProps[]> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}/api/events`, { cache: 'no-store' });
  if (!res.ok) return [];
  const { events } = await res.json();

  const mapped: EventCardProps[] = (events || []).map((e: any) => ({
    id: e.id,
    message: e.message,
    imageSrc: e.imageSrc,
    href: e.href,
    source: e.platform,
    venue: e.venue ?? null,
    publishedTime: e.publishedTime ?? null,
  }));
  return mapped;
}
export default async function Home() {
  // Fuente temporal; después mapea aquí datos del Graph API de Facebook/Instagram.
  const events= await getEvents();  

  return (
    <>
      <HeroSlider />
      <section className="events-section">
        <div className="container">
          <div className="events-header">
            <h2 className="events-title">Publicaciones Recientes</h2>
            <a className="events-view-all" href="#">Ver todo</a>
          </div>
          <EventSlider events={events} />
        </div>
      </section>
    </>
  );
}

