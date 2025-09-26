import type { Metadata } from 'next';
import { Merriweather, Open_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

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
        <header className="main-header">
          <div className="container">
            <Link href="/" className="flex items-center">
              <Image
                src="/adventist-es--denim.svg"
                alt="Logo Iglesia Adventista"
                width={40}
                height={40}
                className="logo"
              />
            </Link>
            
            <nav className="main-nav">
              <Link href="/" className="active">Inicio</Link>
              <Link href="/eventos">Eventos</Link>
              <Link href="/ministerios">Ministerios</Link>
              <Link href="/feligresia">Feligresia</Link>
              <Link href="/sobre-nosotros">Sobre Nosotros</Link>
              <Link href="/contacto">Contacto</Link>
            </nav>
            
            <div className="auth-links">
              <Link href="/login">Login</Link>
              <Link href="/registro">Registro</Link>
              <button className="md:hidden" title="Abrir menú" aria-label="Abrir menú">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        
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