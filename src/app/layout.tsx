import type { Metadata } from 'next';
import { Merriweather, Open_Sans } from 'next/font/google';
import './globals.css';

const titleFont = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-title',
  display: 'swap',
});

const bodyFont = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Iglesia Adventista del Séptimo Día - Timoneda',
  description: 'Comunidad de fe, esperanza y servicio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${titleFont.variable} ${bodyFont.variable}`}>
      <body>
        <header className="header">
          <div className="container">
            <div className="logo-area">
              {/* Inserta aquí el logotipo oficial */}
              <img src="/assets/logo-adventista.svg" alt="Iglesia Adventista del Séptimo Día" />
              <div>
                <h1>Iglesia Adventista del Séptimo Día</h1>
                <p className="subtitle">Esperanza, adoración y servicio</p>
              </div>
            </div>
            <nav aria-label="Principal">
              <ul className="nav">
                <li><a href="/ministerios">Ministerios</a></li>
                <li><a href="/eventos">Eventos</a></li>
                <li><a href="/recursos">Recursos</a></li>
                <li><a className="cta" href="/contacto">Visítanos</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <section className="hero">
            <h2>“A la ley y al testimonio”</h2>
            <p>Un lugar para crecer en fe, compartir esperanza y servir a la comunidad.</p>
            <a className="cta" href="/plan-de-fe">Conoce nuestro plan de fe</a>
          </section>
          <div className="container">{children}</div>
        </main>

        <footer className="footer">
          <div className="container footer-content">
            <div>
              <h3>Contacto</h3>
              <p>Dirección, horarios de culto y medios de comunicación.</p>
            </div>
            <div>
              <h3>Síguenos</h3>
              <ul className="footer-links">
                <li><a href="https://www.facebook.com/">Facebook</a></li>
                <li><a href="https://www.youtube.com/">YouTube</a></li>
              </ul>
            </div>
            <div className="footer-symbol">
              <img src="/assets/icono-llama-biblia.svg" alt="Símbolo Adventista" />
            </div>
          </div>
          <p className="footer-note">© {new Date().getFullYear()} Iglesia Adventista del Séptimo Día - Timoneda.</p>
        </footer>
      </body>
    </html>
  );
}