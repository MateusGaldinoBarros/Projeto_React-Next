import styles from './page.module.css';
import SiteHeader from '../../components/SiteHeader';

const githubUsername = 'MateusGaldinoBarros';
const repositoryName = 'Miaumigo';
const repositoryUrl = `https://github.com/${githubUsername}/${repositoryName}`;
const projectHighlights = [
  'Programação orientada a objetos',
  'Código modular e reutilizável',
  'Criação e consumo de APIs REST',
  'Separação de responsabilidades',
  'Integração entre diferentes tecnologias',
];

async function getProject() {
  try {
    const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repositoryName}`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) return null;

    const project = await response.json();
    return {
      description: project.description,
      language: project.language,
      updatedAt: project.updated_at,
      stars: project.stargazers_count,
    };
  } catch {
    return null;
  }
}

export const metadata = {
  title: 'Experiência acadêmica | Mateus Galdino',
  description: 'Projeto Miaumigo no GitHub.',
};

export default async function AcademicExperience() {
  const project = await getProject();

  return (
    <main className={styles.site}>
      <SiteHeader activePath="/experiencia-academica" actionHref={repositoryUrl} actionLabel="Miaumigo no GitHub ↗" />

      <div className={styles.content}>
        <section className={styles.intro} aria-labelledby="experience-title">
          <span className={styles.eyebrow}>FORMAÇÃO E PROJETOS</span>
          <h1 id="experience-title">Experiência acadêmica</h1>
          <p>Projeto acadêmico apresentado no meu GitHub.</p>
        </section>

        <article className={styles.projectCard}>
          <div className={styles.projectHeader}>
            <span className={styles.projectMark} aria-hidden="true">M</span>
            <div>
              <span className={styles.eyebrow}>PROJETO NO GITHUB</span>
              <h2>Miaumigo</h2>
            </div>
            <a className={styles.projectLink} href={repositoryUrl} target="_blank" rel="noreferrer" aria-label="Abrir repositório Miaumigo no GitHub">↗</a>
          </div>
          <p className={styles.description}>{project?.description || 'Acesse o repositório para conhecer os objetivos, recursos e desenvolvimento do projeto.'}</p>
          <section className={styles.highlights} aria-labelledby="highlights-title">
            <h3 id="highlights-title">Conceitos e práticas</h3>
            <ul>
              {projectHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </section>
          <div className={styles.projectDetails}>
            {project?.language && <span><i className={styles.languageDot} />{project.language}</span>}
            {typeof project?.stars === 'number' && <span>★ {project.stars} estrelas</span>}
            {project?.updatedAt && <span>Atualizado em {new Date(project.updatedAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>}
          </div>
          <a className={styles.readMore} href={repositoryUrl} target="_blank" rel="noreferrer">Ver código e detalhes no GitHub <span>↗</span></a>
        </article>
      </div>
    </main>
  );
}
