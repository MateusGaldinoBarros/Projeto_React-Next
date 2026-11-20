import { Suspense } from 'react';
import styles from './page.module.css';
import SiteHeader from '../../components/SiteHeader';

const githubUsername = 'MateusGaldinoBarros';
const repositoryName = 'consultorio_riomar';
const repositoryUrl = `https://github.com/${githubUsername}/${repositoryName}`;

async function getProject() {
  try {
    const [repositoryResponse, languagesResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${githubUsername}/${repositoryName}`, {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/vnd.github+json' },
      }),
      fetch(`https://api.github.com/repos/${githubUsername}/${repositoryName}/languages`, {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/vnd.github+json' },
      }),
    ]);

    if (!repositoryResponse.ok) return null;
    const repository = await repositoryResponse.json();
    const languages = languagesResponse.ok ? await languagesResponse.json() : {};

    return {
      description: repository.description,
      languages: Object.keys(languages),
      updatedAt: repository.updated_at,
      stars: repository.stargazers_count,
    };
  } catch {
    return null;
  }
}

export const metadata = {
  title: 'Experiência profissional | Mateus Galdino',
  description: 'Projeto Consultório Riomar no GitHub.',
};

async function ProjectCard() {
  const project = await getProject();

  return (
    <article className={styles.projectCard}>
      <div className={styles.projectHeader}>
        <span className={styles.projectMark} aria-hidden="true">CR</span>
        <div>
          <span className={styles.eyebrow}>PROJETO NO GITHUB</span>
          <h2>Consultório Riomar</h2>
          <span className={styles.repositoryName}>{repositoryName}</span>
        </div>
        <a className={styles.projectLink} href={repositoryUrl} target="_blank" rel="noreferrer" aria-label="Abrir repositório Consultório Riomar no GitHub">↗</a>
      </div>
      <p className={styles.description}>{project?.description || 'Acesse o repositório para conhecer os objetivos, recursos e implementação do projeto.'}</p>

      {project?.languages.length > 0 && (
        <section className={styles.technologies} aria-labelledby="technologies-title">
          <h3 id="technologies-title">Tecnologias do repositório</h3>
          <ul>
            {project.languages.map((language) => <li key={language}>{language}</li>)}
          </ul>
        </section>
      )}

      <div className={styles.projectDetails}>
        {typeof project?.stars === 'number' && <span>★ {project.stars} estrelas</span>}
        {project?.updatedAt && <span>Atualizado em {new Date(project.updatedAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>}
      </div>
      <a className={styles.readMore} href={repositoryUrl} target="_blank" rel="noreferrer">Ver código e detalhes no GitHub <span>↗</span></a>
    </article>
  );
}

export default function ProfessionalExperience() {
  return (
    <main className={styles.site}>
      <SiteHeader activePath="/experiencia-profissional" actionHref={repositoryUrl} actionLabel="Ver projeto no GitHub ↗" />

      <div className={styles.content}>
        <section className={styles.intro} aria-labelledby="experience-title">
          <span className={styles.eyebrow}>PROJETO EM DESTAQUE</span>
          <h1 id="experience-title">Experiência profissional</h1>
          <p>Um projeto do meu portfólio profissional, com informações técnicas obtidas diretamente do GitHub.</p>
        </section>

        <Suspense fallback={<p className={styles.loading}>Carregando dados do projeto…</p>}>
          <ProjectCard />
        </Suspense>
      </div>
    </main>
  );
}
