// src/components/ErrorScreen/ErrorScreen.tsx
import React from 'react';
import styles from './ErrorScreen.module.scss';

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => {
  return (
    <div className={styles.errorScreen}>
      <div className={styles.errorContent}>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={onRetry} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    </div>
  );
};