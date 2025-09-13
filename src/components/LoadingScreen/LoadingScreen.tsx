// src/components/LoadingScreen/LoadingScreen.tsx
import React from 'react';
import styles from './LoadingScreen.module.scss';

export const LoadingScreen: React.FC = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.spinner} aria-label="Loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Initializing chat session...</p>
    </div>
  );
};