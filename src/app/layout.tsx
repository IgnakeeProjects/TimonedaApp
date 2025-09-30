import type { Metadata } from 'next';
import { Merriweather, Open_Sans } from 'next/font/google';
import './globals.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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
      <body suppressHydrationWarning>        
        {/* Cabecera principal */}
        <Header />
        
        {/* Contenido principal */}
        <main>{children}</main>

        {/* Footer */}
        <Footer developerUrl="https://tu-dominio.com" developerName="Ignakee llc" />
      </body>
    </html>
  );
}