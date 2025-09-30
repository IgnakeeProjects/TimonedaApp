import HeroSlider from './components/HeroSlider/HeroSlider';
import EventSlider from './components/EventSlider/EventSlider';
import type { EventCardProps } from './components/EventCard/EventCard';
import './globals.css';
import { fetchFacebookEvents, fetchInstagramAsEvents } from './lib/social';


// type ApiEvent = {
//   id: string;
//   platform: 'facebook' | 'instagram';
//   message: string;
//   imageSrc: string;
//   href: string;
//   venue?: string | null;
//   publishedTime?: string | null;
// };

export const revalidate = 300; // ISR: 5 min

async function getEvents(): Promise<EventCardProps[]> {
  const [fb, ig] = await Promise.all([fetchFacebookEvents(), fetchInstagramAsEvents(20)]);
  const merged = [...fb, ...ig].sort(
    (a, b) => new Date(b.publishedTime || 0).getTime() - new Date(a.publishedTime || 0).getTime()
  );
  return merged.map((e) => ({
    id: e.id,
    message: e.message,
    imageSrc: e.imageSrc,
    href: e.href,
    source: e.platform,
    venue: e.venue ?? null,
    publishedTime: e.publishedTime ?? null,
  }));
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

