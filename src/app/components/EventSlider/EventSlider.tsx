'use client';
import { useEffect, useRef, useState } from 'react';
import EventCard, { EventCardProps } from '../EventCard/EventCard';


type Props = {
  events: EventCardProps[];
  ariaLabel?: string;
};

export default function EventSlider({ events, ariaLabel = 'Carrusel de eventos' }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft <= 2);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    const onScroll = () => update();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => update();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

   const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const onPrev = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); scrollByAmount(-1); };
  const onNext = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); scrollByAmount(1); };

  return (
    <div className="events-slider">
      <button type="button" className="events-arrow prev" aria-label="Anterior" onClick={onPrev} disabled={atStart}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
      </button>

      <div className="events-track" ref={trackRef} role="region" aria-label={ariaLabel}>
        {events.map((e) => (
          <div key={e.id} className="events-slide">
            <EventCard {...e} />
          </div>
        ))}
      </div>

      <button type="button" className="events-arrow next" aria-label="Siguiente" onClick={onNext} disabled={atEnd}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>
  );
}