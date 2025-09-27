'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/ministerios', label: 'Ministerios' },
  { href: '/feligresia', label: 'Feligresía' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="main-header">
      <div className="container flex items-center justify-between h-16 gap-4">
        <Link href="/" className="flex items-center" onClick={close}>
          <Image
            src="/adventist-es--denim.svg"
            alt="Logo Iglesia Adventista"
            width={40}
            height={40}
            className="logo"
          />
        </Link>

        {/* Navegación desktop */}
        <nav className="main-nav">
          {navItems.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Banderas entre Contacto y Login (solo desktop) */}
        <div className="flag-list" role="group" aria-label="Selección de región">
          <a href="#" title="España" aria-label="España">
            <Image src="/es.svg" alt="Bandera de España" width={24} height={16} className="flag" />
          </a>
          <a href="#" title="Comunitat Valenciana" aria-label="Comunitat Valenciana">
            <Image src="/valencia.svg" alt="Bandera de la Comunitat Valenciana" width={24} height={16} className="flag" />
          </a>
        </div>

        {/* Enlaces desktop */}
        <div className="auth-links hidden md:flex">
          <Link href="/login">Login</Link>
          <Link href="/registro">Registro</Link>
        </div>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="menu-btn md:hidden"
          title="Abrir menú"
          aria-label="Abrir menú"
          aria-expanded={open ? 'true' : 'false'}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav md:hidden"
          role="navigation"
          aria-label="Menú móvil"
        >
          <ul className="flex flex-col">
            {navItems.map((i) => (
              <li key={i.href}>
                <Link href={i.href} onClick={close} className="block px-4 py-3">
                  {i.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-gray-200" />
            <li className="flex items-center gap-3 px-4 py-3">
            <span className="text-sm text-gray-600 mr-1">Región:</span>
                <a href="#" title="España" aria-label="España">
                    <Image src="/es.svg" alt="Bandera de España" width={24} height={16} className="flag" />
                </a>
                <a href="#" title="Comunitat Valenciana" aria-label="Comunitat Valenciana">
                    <Image src="/valencia.svg" alt="Bandera de la Comunitat Valenciana" width={24} height={16} className="flag" />
                </a>
            </li>
            <li className="flex gap-4 px-4 py-3">
              <Link href="/login" onClick={close}>Login</Link>
              <Link href="/registro" onClick={close}>Registro</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}