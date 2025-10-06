'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: '/imgTimoneda/slide1.png',
    title: 'IGLESIA ADVENTISTA\nTIMONEDA, VALENCIA',
    subtitle: 'Fe en comunidad. Futuro con esperanza.',
    buttonText: 'Únete a Nosotros',
    buttonLink: '/contacto'
  },
  {
    id: 2,
    image: '/imgTimoneda/slide2.png',
    title: 'COMUNIDAD DE FE\nY ESPERANZA',
    subtitle: 'Donde cada persona encuentra su propósito.',
    buttonText: 'Conoce Más',
    buttonLink: '/sobre-nosotros'
  },
  {
    id: 3,
    image: '/imgTimoneda/slide3.png',
    title: 'ADORACIÓN Y\nSERVICIO',
    subtitle: 'Unidos en la fe, sirviendo con amor.',
    buttonText: 'Ver Ministerios',
    buttonLink: '/ministerios'
  }
];

export default function HeroSlider() {

  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [auto]);

  const go = (i: number) => {
    setCurrent(i);
    setAuto(false);
    setTimeout(() => setAuto(true), 8000);
  };

  return (
    <div className="hero-slider-wrapper">
      <section className="hero-slider">
        <div className="slider-container">
          {slides.map((s, i) => (
            <div key={s.id} className={`slide ${i === current ? 'active' : ''}`}>
              <Image src={s.image} alt={`Slide ${i + 1}`} fill className="slide-image" priority={i === 0} />
              <div className="slide-overlay">
                <div className="slide-content">
                  <h1 className="hero-title">
                    {s.title.split('\n').map((line, k) => (
                      <span key={k}>
                        {line}
                        {k < s.title.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </h1>
                  <p className="hero-subtitle">{s.subtitle}</p>
                  <a className="btn btn-primary" href={s.buttonLink}>{s.buttonText}</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-control prev" onClick={() => go((current - 1 + slides.length) % slides.length)} aria-label="Anterior">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button className="slider-control next" onClick={() => go((current + 1) % slides.length)} aria-label="Siguiente">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <div className="slider-indicators">
          {slides.map((_, i) => (
            <button key={i} className={`indicator ${i === current ? 'active' : ''}`} onClick={() => go(i)} aria-label={`Ir al slide ${i + 1}`} />
          ))}
        </div>
      </section>
      {/* Columna derecha con degradado y logo */}
      <aside className="hero-sidebar">
        <div className="hero-sidebar-logo">
          <Image
            src="../adventist-symbol--white.svg"
            alt="Logo Iglesia"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </aside>
    </div>
    
  );
}