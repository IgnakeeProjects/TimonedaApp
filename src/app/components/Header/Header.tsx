'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBrowserSupabase } from '../../lib/supabaseClient';

type MegaMenuItem = {
  title: string;
  description: string;
  href: string;
};

type MegaMenuCategory = {
  categoryTitle: string;
  items: MegaMenuItem[];
};

type NavItem = {
  href: string;
  label: string;
  megaMenu?: MegaMenuCategory[];
};


const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/eventos', label: 'Eventos' },
  { 
    href: '/ministerios', 
    label: 'Ministerios',
    megaMenu: [
      {
        categoryTitle: 'Desarrollo Espiritual',
        items: [
          { title: 'Escuela Sabática', description: 'Estudio bíblico semanal y comunión', href: '/ministerios/escuela-sabatica' },
          { title: 'Ministerio Personal', description: 'Evangelismo y capacitación misionera', href: '/ministerios/personal' },
          { title: 'Mayordomía Cristiana', description: 'Administración de diezmos y talentos', href: '/ministerios/mayordomiا' },
          { title: 'Oración e Intercesión', description: 'Cadena de oración congregacional', href: '/ministerios/oracion' },
        ]
      },
      {
        categoryTitle: 'Niños y Jóvenes',
        items: [
          { title: 'Ministerio Infantil', description: 'Educación espiritual hasta 12 años', href: '/ministerios/infantil' },
          { title: 'Ministerio del Adolescente', description: 'Apoyo espiritual y social', href: '/ministerios/adolescente' },
          { title: 'Juventud Adventista (J.A.)', description: 'Desarrollo juvenil integral', href: '/ministerios/jovenes' },
          { title: 'Conquistadores', description: 'Formación cristiana 10-15 años', href: '/ministerios/conquistadores' },
          { title: 'Aventureros', description: 'Actividades para niños 6-9 años', href: '/ministerios/aventureros' },
          { title: 'Joven Adulto / AMiCUS', description: 'Ministerio universitario', href: '/ministerios/joven-adulto' },
        ]
      },
      {
        categoryTitle: 'Familia y Comunidad',
        items: [
          { title: 'Ministerio de la Familia', description: 'Fortalecimiento del hogar cristiano', href: '/ministerios/familia' },
          { title: 'Ministerio de la Mujer', description: 'Crecimiento y servicio femenino', href: '/ministerios/mujer' },
          { title: 'AMA / Servicio Comunitario', description: 'Ayuda social y brigadas médicas', href: '/ministerios/ama' },
          { title: 'Salud y Temperancia', description: 'Estilo de vida saludable', href: '/ministerios/salud' },
        ]
      },
      {
        categoryTitle: 'Adoración y Organización',
        items: [
          { title: 'Música y Alabanza', description: 'Coro y ministerio de adoración', href: '/ministerios/musica' },
          { title: 'Diaconado y Diaconisas', description: 'Servicio y orden en cultos', href: '/ministerios/diaconado' },
          { title: 'Comunicación', description: 'Medios, redes sociales y audiovisuales', href: '/ministerios/comunicacion' },
          { title: 'Educación', description: 'Escuelas cristianas adventistas', href: '/ministerios/educacion' },
          { title: 'Libertad Religiosa', description: 'Defensa de libertad de conciencia', href: '/ministerios/libertad-religiosa' },
          { title: 'Publicaciones / Colportaje', description: 'Difusión de literatura cristiana', href: '/ministerios/publicaciones' },
        ]
      },
    ]
  },
  { 
    href: '/feligresia', 
    label: 'Feligresía',
    megaMenu: [
      {
        categoryTitle: 'Recursos Espirituales',
        items: [
          { title: 'Estudios Bíblicos', description: 'Cursos y lecciones de la Biblia', href: '/feligresia/estudios-biblicos' },
          { title: 'Grupos Pequeños', description: 'Comunión y crecimiento mutuo', href: '/feligresia/grupos-pequenos' },
          { title: 'Cadena de Oración', description: 'Red de intercesión congregacional', href: '/feligresia/cadena-oracion' },
          { title: 'Biblioteca Digital', description: 'Materiales y guías espirituales', href: '/feligresia/biblioteca' },
        ]
      },
      {
        categoryTitle: 'Participación',
        items: [
          { title: 'Calendario de Actividades', description: 'Eventos y programas semanales', href: '/feligresia/calendario' },
          { title: 'Solicitar Visita Pastoral', description: 'Atención espiritual personalizada', href: '/feligresia/visita-pastoral' },
          { title: 'Testimonios', description: 'Comparte tu experiencia de fe', href: '/feligresia/testimonios' },
        ]
      },
    ]
  },
  { 
    href: '/sobre-nosotros', 
    label: 'Sobre Nosotros',
    megaMenu: [
      {
        categoryTitle: 'Nuestra Identidad',
        items: [
          { title: 'Nuestra Historia', description: 'Origen y desarrollo de la congregación', href: '/sobre-nosotros/historia' },
          { title: 'Creencias Fundamentales', description: '28 doctrinas adventistas', href: '/sobre-nosotros/creencias' },
          { title: 'Visión y Misión', description: 'Propósito congregacional', href: '/sobre-nosotros/vision-mision' },
        ]
      },
      {
        categoryTitle: 'Organización',
        items: [
          { title: 'Liderazgo', description: 'Pastores, ancianos y líderes', href: '/sobre-nosotros/liderazgo' },
          { title: 'Estructura Eclesiástica', description: 'Organización administrativa', href: '/sobre-nosotros/estructura' },
          { title: 'Horarios de Culto', description: 'Servicios semanales', href: '/sobre-nosotros/horarios' },
        ]
      },
    ]
  },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false); // Menú móvil
  const [loggedIn, setLoggedIn] = useState(false); // Estado de autenticación
  const [notifCount, setNotifCount] = useState<number>(0); // Contador de notificaciones
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Mega menú activo
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null); // Mega menú móvil activo

  // Crear el cliente solo en el navegador y solo si hay envs
  const supabase = useMemo(() => getBrowserSupabase(), []);

  useEffect(() => {
    if (!supabase) {
      // Sin configuración de Supabase no intentamos autenticar
      setLoggedIn(false);
      setNotifCount(0);
      return;
    }

    // Evitar llamadas si el componente se desmonta
    let active = true;

    // Estado inicial, obtenemos la sesión, y la cantidad de notificaciones.
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setLoggedIn(Boolean(data?.session));
      setNotifCount(3); // demo
    });

    // Suscripción a cambios, actualizamos el estado de autenticación y notificaciones
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(Boolean(session)); // demo, en real habría que validar la sesión, tokens, etc.
      if (!session) setNotifCount(0); // si se desloguea, a 0
    });

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const close = () => {
    setOpen(false);
    setActiveMenu(null);
    setMobileActiveMenu(null);
  };

  const toggleMobileMenu = (label: string) => {
    setMobileActiveMenu(prev => prev === label ? null : label);
  };

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

        {/* Navegación desktop con mega-menú */}
        <nav className="main-nav">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="nav-item-wrapper"
              onMouseEnter={() => item.megaMenu && setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {item.megaMenu ? (
                <>
                  <button className="nav-item-button">
                    <span>{item.label}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeMenu === item.label && (
                    <div className="mega-menu">
                      <div className="mega-menu-grid">
                        {item.megaMenu.map((category, idx) => (
                          <div key={idx} className="mega-menu-column">
                            <h3 className="mega-menu-title">{category.categoryTitle}</h3>
                            <ul className="mega-menu-list">
                              {category.items.map((menuItem) => (
                                <li key={menuItem.href}>
                                  <Link href={menuItem.href} className="mega-menu-item" onClick={() => setActiveMenu(null)}>
                                    <span className="mega-menu-item-title">{menuItem.title}</span>
                                    <span className="mega-menu-item-desc">{menuItem.description}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </div>
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
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 2a6 6 0 00-6 6v2.09c0 .66-.26 1.3-.73 1.77L3.7 13.43A1 1 0 004.41 15h15.18a1 1 0 00.7-1.74l-1.57-1.57a2.5 2.5 0 01-.72-1.77V8a6 6 0 00-6-6zm0 20a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            {notifCount > 0 && <span className="notify-dot">{notifCount}</span>}
          </button>
        )}

        {/* Auth links */}
        <div className="auth-links hidden md:flex">
          <Link href="/login">Login</Link>
          <Link href="/registro">Registro</Link>
        </div>

        {/* Botón hamburguesa (solo móvil) */}
        <button className="menu-btn md:hidden" aria-label="Abrir menú" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <nav className="mobile-nav md:hidden">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.megaMenu ? (
                  <>
                    <button
                      onClick={() => toggleMobileMenu(item.label)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileActiveMenu === item.label ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileActiveMenu === item.label && (
                      <div className="bg-gray-50 pl-4">
                        {item.megaMenu.map((category, idx) => (
                          <div key={idx} className="py-2">
                            <h4 className="px-4 py-2 text-xs font-bold text-gray-600 uppercase">{category.categoryTitle}</h4>
                            <ul>
                              {category.items.map((menuItem) => (
                                <li key={menuItem.href}>
                                  <Link
                                    href={menuItem.href}
                                    onClick={close}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    {menuItem.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} onClick={close} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="mt-2 border-t border-gray-200" />
            <li className="flex items-center gap-3 px-4 py-3">
              <span className="text-sm text-gray-600">Región:</span>
              <a href="#" title="España"><Image src="/es.svg" alt="España" width={24} height={16} className="flag" /></a>
              <a href="#" title="Valencia"><Image src="/valencia.svg" alt="Valencia" width={24} height={16} className="flag" /></a>
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