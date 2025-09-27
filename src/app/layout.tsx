import type { Metadata } from 'next';
import { Merriweather, Open_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';
import Header from './components/Header/Header';

// Configuración de fuentes
const titleFont = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-title',
});

const bodyFont = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Iglesia Adventista Timoneda, Valencia',
  description: 'Fe en comunidad, Futuro con esperanza.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${titleFont.variable} ${bodyFont.variable}`}>
      <body>        
        {/* Cabecera principal */}
        <Header />
        
        {/* Contenido principal */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="main-footer">
          <div className="container">
            <div className="flex items-center">
              <Image
                src="/logo-adventista-white.png"
                alt="Seventh-day Adventist Church"
                width={48}
                height={48}
                className="footer-logo mr-4"
              />
              <span>Seventh-day Adventist Church</span>
            </div>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
              </a>
              <a href="#" aria-label="Instagram">
                <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
              </a>
              <a href="#" aria-label="Twitter">
                <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
              </a>
              <div className="text-right text-sm">
                <a href="#" className="hover:underline">Aviso Legal</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}