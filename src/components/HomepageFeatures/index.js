import {useState} from 'react';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// Replace the href and handle values with your own.
const Socials = [
  {
    label: 'GitHub',
    handle: '@dillp1',
    href: 'https://github.com/dillp1',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    handle: 'in/dillon-michlena',
    href: 'https://www.linkedin.com/in/dillon-michlena',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'dillon.michlena@gmail.com',
    href: 'mailto:dillon.michlena@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
];

function SocialCard({label, handle, href, icon}) {
  const external = href.startsWith('http');
  return (
    <a
      className={styles.socialCard}
      href={href}
      {...(external && {target: '_blank', rel: 'noopener noreferrer'})}>
      <span className={styles.socialIcon}>{icon}</span>
      <span className={styles.socialText}>
        <span className={styles.socialLabel}>{label}</span>
        <span className={styles.socialHandle}>{handle}</span>
      </span>
    </a>
  );
}

function Headshot() {
  const [missing, setMissing] = useState(false);
  const src = useBaseUrl('/img/Headshot.png');
  if (missing) {
    return <div className={styles.headshotPlaceholder}>DM</div>;
  }
  return (
    <img
      className={styles.headshot}
      src={src}
      alt="Headshot of Dillon Michlena"
      onError={() => setMissing(true)}
    />
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.about}>
      <div className="container">
        <Heading as="h2" id="about">About Me</Heading>
        <div className={`row ${styles.aboutRow}`}>
          <div className="col col--8">
            <div className={styles.bio}>
              <p>I'm a senior at Purdue University working across hardware and software in robotics.</p>
              <p>I like building things that move. Right now that's Purdue Lunabotics, where I'm the Fabrication Operations Lead and design mechanical systems for a lunar rover.</p>
              <p>I'm most interested in embedded systems, and I like owning a project from start to finish: CAD, circuit design, and the code that runs it.</p>
              <p>Outside of engineering, you'll find me at the gym, climbing the ranks in esports, or outside touching grass.</p>
            </div>
          </div>
          <div className={`col col--4 ${styles.headshotCol}`}>
            <Headshot />
          </div>
        </div>
        <div className={styles.socials}>
          {Socials.map((social) => (
            <SocialCard key={social.label} {...social} />
          ))}
        </div>
      </div>
    </section>
  );
}