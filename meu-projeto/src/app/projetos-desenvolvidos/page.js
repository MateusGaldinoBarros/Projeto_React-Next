import { Suspense } from 'react';
import styles from './page.module.css';
import SiteHeader from '../../components/SiteHeader';

const githubUsername = 'MateusGaldinoBarros';

async function getRepositories() {
  const repositories = [];
  let page = 1;

  try {
    while (true) {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100&page=${page}`,
        {
          next: { revalidate: 3600 },
          headers: { Accept: 'application/vnd.github+json' },
        },
      );
      if (!response.ok) return null;

      const currentPage = await response.json();
      repositories.push(...currentPage);
      if (currentPage.length < 100) break;
      page += 1;
    }

    return repositories;
  } catch {
    return null;
  }
}

export const metadata = {
  title: 'Projetos desenvolvidos | Mateus Galdino',
  description: 'Projetos e repositórios públicos de Mateus Galdino no GitHub.',
};

async function RepositoryList() {
  const repositories = await getRepositories();

  if (!repositories) {
    return <p className={styles.message}>Não foi possível carregar os projetos agora. <a href={`https://github.com/${githubUsername}?tab=repositories`} target="_blank" rel="noreferrer">Ver repositórios no GitHub ↗</a></p>;
  }

  if (repositories.length === 0) {
    return <p className={styles.message}>Nenhum repositório público encontrado.</p>;
  }

  return (
    <div className={styles.repositoryGrid}>
      {repositories.map((repository) => (
        <article className={styles.repositoryCard} key={repository.id}>
          <div className={styles.repositoryHeading}>
            <span className={styles.repositoryIcon} aria-hidden="true">⌘</span>
            <a href={repository.html_url} target="_blank" rel="noreferrer">{repository.name} ↗</a>
          </div>
          <p>{repository.description || 'Repositório público no GitHub.'}</p>
          <div className={styles.repositoryMeta}>
            {repository.language && <span><i className={styles.languageDot} />{repository.language}</span>}
            <span>★ {repository.stargazers_count}</span>
            {repository.fork && <span>Fork</span>}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function PersonalProjects() {
  return (
    <main className={styles.site}>
      <SiteHeader activePath="/projetos-desenvolvidos" actionHref={`https://github.com/${githubUsername}?tab=repositories`} />

      <div className={styles.content}>
        <section className={styles.intro} aria-labelledby="projects-title">
          <span className={styles.eyebrow}>REPOSITÓRIOS PÚBLICOS</span>
          <h1 id="projects-title">Projetos desenvolvidos</h1>
          <p>Projetos publicados no meu GitHub, com descrição e linguagem principal carregadas do repositório.</p>
        </section>

        <Suspense fallback={<p className={styles.message}>Carregando projetos do GitHub…</p>}>
          <RepositoryList />
        </Suspense>
      </div>
    </main>
  );
}
