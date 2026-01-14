import { createFileRoute } from '@tanstack/react-router';
import styles from './logs.module.scss';

export const Route = createFileRoute('/logs')({
  component: Logs,
});

const logEntries = [
  {
    date: '2026.01.14',
    time: '14:32',
    type: 'INFO',
    message: 'System initialization complete. All modules loaded successfully.',
  },
  {
    date: '2026.01.12',
    time: '10:15',
    type: 'DEPLOY',
    message:
      'Deployed NEURAL_INTERFACE_V4 to production. Performance metrics optimal.',
  },
  {
    date: '2026.01.10',
    time: '16:45',
    type: 'BUILD',
    message:
      'Completed VOX_COIN_DASH integration. Real-time analytics operational.',
  },
  {
    date: '2026.01.08',
    time: '09:20',
    type: 'UPDATE',
    message:
      'Updated CYBER_GRID_UI design system. Added 3D rendering components.',
  },
  {
    date: '2026.01.06',
    time: '13:10',
    type: 'INFO',
    message:
      'Optimized QUANTUM_COMPUTE algorithms. Processing speed increased by 40%.',
  },
  {
    date: '2026.01.04',
    time: '11:30',
    type: 'SECURITY',
    message:
      'GHOST_PROTOCOL encryption layer updated. Zero-knowledge architecture verified.',
  },
];

function Logs() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titlePrefix}>03//</div>
        <h1 className={styles.title}>SYSTEM_LOGS</h1>
        <div className={styles.commandLine}>
          &gt; tail -f system.log --format=terminal
        </div>
      </div>

      <div className={styles.logsContainer}>
        {logEntries.map((log, idx) => (
          <div key={idx} className={styles.logEntry}>
            <div className={styles.logHeader}>
              <span className={styles.logDate}>
                [{log.date} | {log.time}]
              </span>
              <span
                className={`${styles.logType} ${
                  styles[log.type.toLowerCase()]
                }`}
              >
                [{log.type}]
              </span>
            </div>
            <div className={styles.logMessage}>{log.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
