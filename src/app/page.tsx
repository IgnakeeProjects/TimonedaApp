import HeroSlider from './components/HeroSlider/HeroSlider';
import EventSlider from './components/EventSlider/EventSlider';
import type { EventCardProps } from './components/EventCard/EventCard';
import './globals.css';
import { fetchFacebookEvents, fetchInstagramAsEvents } from './lib/social';
import YouTubePageClient from './components/Youtube/YouTubePageClient';
import { getLiveVideoId, getPlaylistVideos, getUploadsPlaylistId } from './lib/youtube';


// type ApiEvent = {
//   id: string;
//   platform: 'facebook' | 'instagram';
//   message: string;
//   imageSrc: string;
//   href: string;
//   venue?: string | null;
//   publishedTime?: string | null;
// };

export const revalidate = 60; // ISR: 1 min

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

  const playlistId = await getUploadsPlaylistId();
  const [liveId, playlist] = await Promise.all([
    getLiveVideoId(),
    getPlaylistVideos(playlistId),
  ]);

  const items = playlist.items ?? [];
  const initialSelectedId = liveId || items[0]?.id || null;

  return (
    <>      
      <HeroSlider />

      <section className="container mx-auto px-4 py-8 sermons-section">
        <header className="mb-6">
            <h1 className="events-title">En Vivo y Galería</h1>
            <p className="text-gray-600">Sigue el directo o explora nuestros mensajes anteriores.</p>
        </header>
        <YouTubePageClient
          initialSelectedId={initialSelectedId}
          playlistId={playlistId}
          initialItems={items}
          initialNextPageToken={playlist.nextPageToken || null}
          liveActive={Boolean(liveId)}
        />
        <div>
          
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-8 events-section">
        <div className="events-header">
            <div>
              <h2 className="events-title">Publicaciones Recientes</h2>
              <p className="text-gray-600 text-left">Siguenos en nuestras redes sociales.</p>
            </div>            
            <a className="events-view-all" href="#">Ver todo</a>
        </div>
          <EventSlider events={events} />
      </section>
    </>
  );
}

