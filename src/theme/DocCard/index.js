import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import {useDocById} from '@docusaurus/plugin-content-docs/client';
import OriginalDocCard from '@theme-original/DocCard';
import styles from './styles.module.css';

// Project card with a photo thumbnail. A project opts in by setting
// `sidebar_custom_props.image` in its front matter; anything without one
// falls back to Docusaurus's standard card.
function ProjectCard({item}) {
  const doc = useDocById(item.docId ?? undefined);
  const {image, imageFit, imagePosition} = item.customProps;
  const src = useBaseUrl(image);
  const description = item.description ?? doc?.description;

  return (
    <Link href={item.href} className={clsx('card', styles.card)}>
      <div className={clsx(styles.thumb, imageFit === 'contain' && styles.contain)}>
        <img
          src={src}
          alt=""
          loading="lazy"
          style={imagePosition ? {objectPosition: imagePosition} : undefined}
        />
      </div>
      <div className={styles.body}>
        <Heading as="h2" className={styles.title} title={item.label}>
          {item.label}
        </Heading>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </Link>
  );
}

export default function DocCard(props) {
  if (props.item.type === 'link' && props.item.customProps?.image) {
    return <ProjectCard {...props} />;
  }
  return <OriginalDocCard {...props} />;
}
