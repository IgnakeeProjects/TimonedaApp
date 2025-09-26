import Image from 'next/image';
import HeroSlider from './components/HeroSlider/HeroSlider';
import './globals.css';

export default function Home() {
  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Sección de Próximos Eventos */}
      <section className="events-section">
        <div className="container">
          <h2 className="events-title">Próximos Eventos</h2>
          <div className="events-grid">
            <div className="event-card">
              <Image
                src="/events/event1.jpg"
                alt="Noche Alabanza Joven"
                fill
                className="object-cover"
              />
              <div className="event-overlay">
                <div className="event-date">21</div>
                <div className="event-title">
                  Noche Alabanza Joven<br />
                  Joven Adventismo
                </div>
                <button className="event-btn">Ver Detalles</button>
              </div>
            </div>
            
            <div className="event-card">
              <Image
                src="/events/event2.jpg"
                alt="Escuela Bíblica Joven"
                fill
                className="object-cover"
              />
              <div className="event-overlay">
                <div className="event-date">23</div>
                <div className="event-title">
                  Escuela Bíblica<br />
                  Joven Joven
                </div>
                <button className="event-btn">Ver Detalles</button>
              </div>
            </div>
            
            <div className="event-card">
              <Image
                src="/events/event3.jpg"
                alt="Evento Joven"
                fill
                className="object-cover"
              />
              <div className="event-overlay">
                <div className="event-date">25</div>
                <div className="event-title">
                  Evento Especial<br />
                  Juventud
                </div>
                <button className="event-btn">Ver Detalles</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Sermones Recientes */}
      <section className="sermons-section">
        <div className="container">
          <h2 className="sermons-title">Sermones Recientes</h2>
          <div className="sermons-grid">
            <div className="sermon-card">
              <div className="sermon-thumbnail">
                <Image
                  src="/sermons/sermon1.jpg"
                  alt="Clíasle PI Cumes"
                  fill
                  className="object-cover"
                />
                <div className="play-button">
                  <div className="play-button-icon">
                    <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="sermon-info">
                <h3 className="sermon-title">Clíasle PI Cumes</h3>
                <p className="sermon-details">
                  14 alumnos dte Divinidad, abtenticede<br />
                  12:00 - 18:50
                </p>
              </div>
            </div>

            <div className="sermon-card">
              <div className="sermon-thumbnail">
                <Image
                  src="/sermons/sermon2.jpg"
                  alt="Clíashe Alabanza Joven"
                  fill
                  className="object-cover"
                />
                <div className="play-button">
                  <div className="play-button-icon">
                    <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="sermon-info">
                <h3 className="sermon-title">Clíashe Alabanza Joven</h3>
                <p className="sermon-details">
                  25 artemita exel ultimaten un oficio de<br />
                  12:00 - 18:BU
                </p>
              </div>
            </div>

            <div className="sermon-card">
              <div className="sermon-thumbnail">
                <Image
                  src="/sermons/sermon3.jpg"
                  alt="Liiga d Circa"
                  fill
                  className="object-cover"
                />
                <div className="play-button">
                  <div className="play-button-icon">
                    <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="sermon-info">
                <h3 className="sermon-title">Liiga d Circa</h3>
                <p className="sermon-details">
                  25 minutos tocanto de condífales<br />
                  12:00 - 18:Sia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}