// src/components/SessionControls/SessionControls.tsx
import React, { useState } from 'react';
import styles from './SessionControls.module.scss';

interface SessionControlsProps {
  sessionId: string;
  onResetSession: () => void;
  ttl: number;
}

export const SessionControls: React.FC<SessionControlsProps> = ({
  sessionId,
  onResetSession,
  ttl,
}) => {
  const [copied, setCopied] = useState(false);

  const copySessionLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?session=${sessionId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatTTL = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className={styles.sessionControls}>
      <div className={styles.sessionInfo}>
        <span className={styles.sessionId}>
          Session: {sessionId ? sessionId.slice(0, 8) : 'N/A'}...
        </span>
      </div>
      <div className={styles.buttons}>
        {/* <button
          onClick={copySessionLink}
          className={styles.button}
          aria-label="Copy session link"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button> */}
        <button
          onClick={onResetSession}
          className={styles.button}
          aria-label="Reset session"
        >
          Reset Session
        </button>
      </div>
    </div>
  );
};