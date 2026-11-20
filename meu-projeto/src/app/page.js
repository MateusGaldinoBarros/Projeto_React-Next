import styles from './page.module.css';
import ContributionCalendar from '../components/ContributionCalendar';

const githubUsername = 'MateusGaldinoBarros';

async function getGithubProfile() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function getContributions() {
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.contributions || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [profile, contributions] = await Promise.all([getGithubProfile(), getContributions()]);
  const name = profile?.name || githubUsername;

  return (
    <main className={styles.site}>
      <header className={styles.header}>
        <a className={styles.brand} href="#inicio">{name}<span>GitHub</span></a>
        <a className={styles.profileLink} href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
          Abrir perfil ↗
        </a>
      </header>

      <div className={styles.content} id="inicio">
        <section className={styles.profile} aria-labelledby="profile-title">
          <img
            className={styles.avatar}
            src={profile?.avatar_url || `https://github.com/${githubUsername}.png`}
            alt={`Foto de perfil de ${name}`}
          />
          <div className={styles.profileDetails}>
            <span className={styles.eyebrow}>PERFIL DO GITHUB</span>
            <h1 id="profile-title">{name}</h1>
            <a className={styles.handle} href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
              @{githubUsername}
            </a>
            <p>{profile?.bio || 'Perfil público no GitHub.'}</p>
            {profile?.location && <span className={styles.location}>⌖ {profile.location}</span>}
          </div>
          <dl className={styles.stats}>
            <div><dt>Repositórios</dt><dd>{profile?.public_repos ?? '—'}</dd></div>
            <div><dt>Seguidores</dt><dd>{profile?.followers ?? '—'}</dd></div>
            <div><dt>Seguindo</dt><dd>{profile?.following ?? '—'}</dd></div>
          </dl>
        </section>

        <section className={styles.activity} aria-labelledby="activity-title">
          <div className={styles.activityHeading}>
            <div><span className={styles.eyebrow}>CONTRIBUIÇÕES</span><h2 id="activity-title">Atividade no GitHub</h2></div>
            <span className={styles.period}>Último ano</span>
          </div>
          {contributions.length ? (
            <>
              <ContributionCalendar contributions={contributions} />
              <div className={styles.legend}><span>Menos</span><i /><i /><i /><i /><span>Mais</span></div>
            </>
          ) : (
            <p className={styles.graphFallback}>Não foi possível carregar as contribuições agora. <a href={`https://github.com/${githubUsername}?tab=overview`} target="_blank" rel="noreferrer">Ver atividade no GitHub ↗</a></p>
          )}
        </section>
      </div>
    </main>
  );
}
