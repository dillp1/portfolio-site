import clsx from 'clsx';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Hi. I'm Dillon Michlena,
          <br />
          <span className={styles.heroAccent}>Robotics Engineer.</span>
        </Heading>
        <p className="hero__subtitle">Hardware and software engineer interested in all things robotics and engineering.</p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Robotics Engineer"
      description="Dillon Michlena is a senior at Purdue University building robots across hardware and software, with a focus on embedded systems.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
