'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../lib/supabaseClient';

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [notifCount, setNotifCount] = useState<number>(0); // placeholder

  useEffect(() => {
    // Estado inicial
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(Boolean(data.session));
      // TODO: carga de notificaciones reales
      setNotifCount(3); // demo
    });

    // Suscripción a cambios
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(Boolean(session));
      if (!session) setNotifCount(0);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

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

        {/* Icono de notificaciones (solo si logueado) */}
        {loggedIn && (
          <button
            type="button"
            className="notify-btn hidden md:inline-flex"
            aria-label="Notificaciones"
            aria-haspopup="true"
            onClick={() => alert('Abrir panel de notificaciones (TODO)')}
          >
            {/* Campana */}
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
              <path d="M12 2a6 6 0 00-6 6v2.09c0 .66-.26 1.3-.73 1.77L3.7 13.43A1 1 0 004.41 15h15.18a1 1 0 00.7-1.74l-1.57-1.57a2.5 2.5 0 01-.72-1.77V8a6 6 0 00-6-6zm0 20a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            {notifCount > 0 && <span className="notify-dot" aria-label={`${notifCount} notificaciones`}>{notifCount}</span>}
          </button>
        )}

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
              {loggedIn && (
                <button
                  type="button"
                  className="notify-btn ml-auto"
                  aria-label="Notificaciones"
                  onClick={() => alert('Abrir panel de notificaciones (TODO)')}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a6 6 0 00-6 6v2.09c0 .66-.26 1.3-.73 1.77L3.7 13.43A1 1 0 004.41 15h15.18a1 1 0 00.7-1.74l-1.57-1.57a2.5 2.5 0 01-.72-1.77V8a6 6 0 00-6-6zm0 20a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  {notifCount > 0 && <span className="notify-dot">{notifCount}</span>}
                </button>
              )}
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