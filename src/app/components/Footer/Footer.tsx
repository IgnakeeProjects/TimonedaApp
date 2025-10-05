import Image from 'next/image';
import Link from 'next/link';

type SimpleLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: SimpleLink[] };
type SocialLink = { href: string; icon: string; label: string };

interface FooterProps {
  title?: string;
  columns?: FooterColumn[];
  bottomLinks?: SimpleLink[];
  social?: SocialLink[];
  orgName?: string;
  developerName?: string;   // <— nuevo
  developerUrl?: string;    // <— nuevo (opcional)
  developerLogoSrc?: string; // nuevo
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'Bibliotecas',
    links: [
      { label: 'Escrituras', href: '#' },
      { label: 'Conferencia General', href: '#' },
      { label: 'Ven, sígueme', href: '#' },
      { label: 'Biblioteca del Evangelio', href: '#' },
      { label: 'Biblioteca multimedia', href: '#' },
      { label: 'Biblioteca de música', href: '#' },
      { label: 'Ayuda para la vida', href: '#' },
      { label: 'Temas y preguntas', href: '#' },
    ],
  },
  {
    title: 'Servir',
    links: [
      { label: 'Llamamientos', href: '#' },
      { label: 'Compartir el Evangelio', href: '#' },
      { label: 'Ser voluntario y prestar servicio', href: '#' },
      { label: 'Templos', href: '#' },
      { label: 'Historia familiar', href: '#' },
      { label: 'Cuidar de los necesitados', href: '#' },
    ],
  },
  {
    title: 'Noticias',
    links: [
      { label: 'Sala de prensa', href: '#' },
      { label: 'Eventos', href: '#' },
      { label: 'Transmisiones', href: '#' },
    ],
  },
  {
    title: 'Acerca de nosotros',
    links: [
      { label: 'Quiénes somos', href: '/quienes-somos' },
      { label: 'Nuestra historia', href: '#' },
      { label: 'Lo que creemos', href: '/creencias' },
      { label: 'Lo que hacemos', href: '#' },
      { label: 'Aprende más con los misioneros', href: '#' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Mi página de inicio', href: '#' },
      { label: 'Donativos', href: '/donar' },
      { label: 'Citas del templo', href: '#' },
      { label: 'Recursos para líderes', href: '#' },
      { label: 'Portal Misional', href: '#' },
      { label: 'FamilySearch.org', href: 'https://www.familysearch.org', external: true },
      { label: 'Directorio y mapa del barrio', href: '#' },
      { label: 'Calendario', href: '#' },
      { label: 'Localizador de centros', href: '#' },
      { label: 'Tienda en línea', href: '#' },
      { label: 'Notas', href: '#' },
      { label: 'Bendición patriarcal', href: '#' },
      { label: 'Todos los recursos', href: '#' },
    ],
  },
];

const defaultBottomLinks: SimpleLink[] = [
  { label: 'Mapa del sitio', href: '#' },
  { label: 'Comentarios', href: '#' },
  { label: 'Empleo', href: '#' },
  { label: 'Ayuda', href: '#' },
  { label: 'Sitios por Área', href: '#' },
];

const defaultSocial: SocialLink[] = [
  { href: '#', icon: '/icons/facebook.svg', label: 'Facebook' },
  { href: '#', icon: '/icons/instagram.svg', label: 'Instagram' },
  { href: '#', icon: '/icons/youtube.svg', label: 'YouTube' },
];

export default function Footer({
  title = 'Aprende más sobre nosotros',
  columns = defaultColumns,
  bottomLinks = defaultBottomLinks,
  social = defaultSocial,
  orgName = 'Iglesia Adventista de Timoneda',
  developerName,
  developerUrl, // p.ej.: 'https://tu-dominio.com'
  developerLogoSrc='/LOGO_Oficial_Ignakee.png', // p.ej.: '/icons/tu-logo.svg'
}: FooterProps) {
  const year = new Date().getFullYear();

  const LinkOrA = ({ link }: { link: SimpleLink }) => {
    if (link.external) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link href={link.href} className="footer-link">
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="main-footer" role="contentinfo">
      {/* Sección superior (mega-footer) */}
      <section className="footer-mega">
        <div className="container">
          <h2 className="footer-title">{title}</h2>

          <nav className="footer-grid" aria-label="Enlaces informativos del pie">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="footer-col-title">{col.title}</h3>
                <ul>
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.label}`}>
                      <LinkOrA link={l} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </section>

      {/* Sección inferior (utilidades, RRSS y legal) */}
      <section className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <nav className="footer-links" aria-label="Enlaces utilitarios">
              {bottomLinks.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link-utility"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.label} href={l.href} className="footer-link-utility">
                    {l.label}
                  </Link>
                )
              )}
            </nav>

            <div className="footer-social" aria-label="Redes sociales">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                >
                  <Image src={s.icon} alt={s.label} width={20} height={20} />
                </a>
              ))}
            </div>

            <div className="footer-copy">
              <p>
                <Link href="/accesibilidad" className="underline-offset-2 hover:underline">
                  Accesibilidad para personas con discapacidad
                </Link>
              </p>
              <p className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                <Link href="/condiciones" className="link-muted">Condiciones de uso</Link>
                <span aria-hidden="true">•</span>
                <Link href="/privacidad" className="link-muted">Aviso de privacidad</Link>
                <span aria-hidden="true">•</span>
                <Link href="/cookies" className="link-muted">Preferencias sobre cookies</Link>
              </p>
              <p>© {year} {orgName}. Todos los derechos reservados.</p>
              {/* Crédito del desarrollador */}
              <div className="footer-dev">
                {developerUrl ? (
                  <a href={developerUrl} target="_blank" rel="noopener noreferrer" className="footer-dev-link">
                    {developerLogoSrc && (
                      <Image
                        src={developerLogoSrc}
                        alt={`${developerName} logo`}
                        width={20}
                        height={20}
                        className="footer-dev-logo"
                      />
                    )}
                    <span>Desarrollado por {developerName}</span>
                  </a>
                ) : (
                  <span className="footer-dev-link">
                    {developerLogoSrc && (
                      <Image
                        src={developerLogoSrc}
                        alt={`${developerName} logo`}
                        width={20}
                        height={20}
                        className="footer-dev-logo"
                      />
                    )}
                    <span>Desarrollado por {developerName}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>        
      </section>
    </footer>
  );
}