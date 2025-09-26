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

// Componente de Layout principal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${titleFont.variable} ${bodyFont.variable}`}>
      <body>
        {/* Barra superior de anuncios */}
        <div className="top-bar">
          <p>Bienvenidos a nuestra comunidad de fe. ¡Te esperamos!</p>
        </div>

        {/* Cabecera principal */}
        <header className="main-header">
          <div className="container">
            <Link href="/">
              <Image
                src="/logo-adventista.svg" // Asegúrate que esta ruta es correcta
                alt="Logo Iglesia Adventista"
                width={50}
                height={40}
                className="logo"
              />
            </Link>
            <nav className="main-nav hidden md:flex">
              <Link href="/" className="active">Inicio</Link>
              <Link href="/eventos">Eventos</Link>
              <Link href="/ministerios">Ministerios</Link>
              <Link href="/sobre-nosotros">Sobre Nosotros</Link>
              <Link href="/contacto">Contacto</Link>
            </nav>
            <div className="auth-links hidden md:flex items-center">
              <Link href="/login">Login</Link>
              <Link href="/registro">Registro</Link>
            </div>
            {/* Icono de menú para móviles */}
            <button className="md:hidden" title="Abrir menú" aria-label="Abrir menú">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </header>

        {/* Contenido principal de la página */}
        <main>{children}</main>

        {/* Pie de página */}
        <footer className="main-footer">
          <div className="container">
            <div className="flex items-center">
              <Image
                src="/logo-adventista-blanco.svg" // Versión blanca del logo
                alt="Logo Iglesia Adventista"
                width={60}
                height={50}
                className="footer-logo mr-4"
              />
              <span>© {new Date().getFullYear()} Seventh-day Adventist Church</span>
            </div>
            <div className="social-icons mt-4 md:mt-0">
              {/* Reemplaza con tus enlaces reales */}
              <a href="#" aria-label="Facebook"><Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} /></a>
              <a href="#" aria-label="Instagram"><Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} /></a>
              <a href="#" aria-label="Twitter"><Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} /></a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}