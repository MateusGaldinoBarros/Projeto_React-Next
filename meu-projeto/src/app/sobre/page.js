import styles from './page.module.css';
import SiteHeader from '../../components/SiteHeader';

const technologyGroups = [
  {
    title: 'Linguagens e fundamentos web',
    technologies: ['Java', 'Python', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Frameworks e bibliotecas',
    technologies: ['React', 'Next.js', 'Spring Boot'],
  },
  {
    title: 'Bancos de dados',
    technologies: ['PostgreSQL', 'MySQL'],
  },
  {
    title: 'Ferramentas',
    technologies: ['Docker', 'Git'],
  },
];

export const metadata = {
  title: 'Sobre | Mateus Galdino',
  description: 'Tecnologias utilizadas por Mateus Galdino.',
};

export default function About() {
  return (
    <main className={styles.site}>
      <SiteHeader activePath="/sobre" actionHref="https://github.com/MateusGaldinoBarros" />

      <div className={styles.content}>
        <section className={styles.intro} aria-labelledby="about-title">
          <span className={styles.eyebrow}>SOBRE MIM</span>
          <h1 id="about-title">Tecnologias que utilizo</h1>
          <p>Estas são as linguagens, ferramentas, frameworks e bancos de dados que fazem parte do meu trabalho.</p>
        </section>

        <div className={styles.groups}>
          {technologyGroups.map(({ title, technologies }) => (
            <section className={styles.group} key={title} aria-labelledby={`group-${title}`}>
              <h2 id={`group-${title}`}>{title}</h2>
              <ul className={styles.technologyList}>
                {technologies.map((technology) => (
                  <li className={styles.technology} key={technology}>
                    <span className={styles.technologyMark} aria-hidden="true">{technology.slice(0, 2).toUpperCase()}</span>
                    <span>{technology}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
