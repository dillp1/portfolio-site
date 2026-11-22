import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// Live summary of the FabOps RAIL. Data comes from the Apps Script web app in
// scripts/rail-public-stats.gs, whose URL is set in docusaurus.config.js
// (customFields.railStatsUrl). Only aggregate counts are fetched.
export default function RailStats() {
  const {siteConfig} = useDocusaurusContext();
  const url = siteConfig.customFields?.railStatsUrl;
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((json) => !cancelled && setData(json))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [url]);

  // Not configured yet, or the endpoint is down: show nothing rather than a broken panel.
  if (!url || failed) return null;

  if (!data) {
    return (
      <div className={styles.panel} aria-busy="true">
        <div className={styles.header}>
          <span className={styles.live}>Live</span> Loading RAIL data…
        </div>
      </div>
    );
  }

  const pct = data.total ? Math.round((data.done / data.total) * 100) : 0;
  const subteams = Object.entries(data.bySubteam).sort((a, b) => b[1].total - a[1].total);
  const statuses = Object.entries(data.byStatus).sort((a, b) => b[1] - a[1]);
  const updated = new Date(data.updated).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.live}>Live</span> From the RAIL · updated {updated}
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.value}>{data.total}</div>
          <div className={styles.label}>parts tracked</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.value}>{data.done}</div>
          <div className={styles.label}>done</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.value}>{pct}%</div>
          <div className={styles.label}>complete</div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Progress by subteam</div>
        {subteams.map(([name, s]) => {
          const p = s.total ? (s.done / s.total) * 100 : 0;
          return (
            <div key={name} className={styles.barRow}>
              <span className={styles.barName}>{name}</span>
              <span
                className={styles.bar}
                role="progressbar"
                aria-label={`${name}: ${s.done} of ${s.total} parts done`}
                aria-valuenow={Math.round(p)}
                aria-valuemin={0}
                aria-valuemax={100}>
                <span className={styles.barFill} style={{width: `${p}%`}} />
              </span>
              <span className={styles.barCount}>
                {s.done}/{s.total}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>By status</div>
        <ul className={styles.statusList}>
          {statuses.map(([status, count]) => (
            <li key={status}>
              <span>{status}</span>
              <span className={styles.statusCount}>{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
