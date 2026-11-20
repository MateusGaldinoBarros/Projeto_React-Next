import Link from 'next/link';
import styles from './SiteHeader.module.css';

const navigationLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/experiencia-academica', label: 'Experiência acadêmica' },
  { href: '/experiencia-profissional', label: 'Experiência profissional' },
  { href: '/projetos-desenvolvidos', label: 'Projetos desenvolvidos' },
];

export default function SiteHeader({ activePath, name = 'Mateus Galdino', actionHref, actionLabel = 'GitHub ↗' }) {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/">{name}<span>GitHub</span></Link>
      <nav className={styles.navigation} aria-label="Navegação principal">
        {navigationLinks.map(({ href, label }) => (
          <Link
            className={activePath === href ? styles.activeLink : ''}
            href={href}
            key={href}
            aria-current={activePath === href ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      {actionHref && <a className={styles.action} href={actionHref} target="_blank" rel="noreferrer">{actionLabel}</a>}
    </header>
  );
}
