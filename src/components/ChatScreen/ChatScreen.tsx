// src/components/ChatScreen/ChatScreen.tsx
import React from 'react';
import { MessageList } from '../MessageList/MessageList';
import { MessageInput } from '../MessageInput/MessageInput';
import { SessionControls } from '../SessionControls/SessionControls';
import { useChat } from '../../hooks/useChat';
import styles from './ChatScreen.module.scss';

interface ChatScreenProps {
  sessionId: string;
  onResetSession: () => void;
  ttl: number;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  sessionId,
  onResetSession,
  ttl,
}) => {
  const { messages, loading, streaming, error, sendMessage, stopStreaming } = useChat(sessionId);

  return (
    <div className={styles.chatScreen}>
      <SessionControls 
        sessionId={sessionId} 
        onResetSession={onResetSession}
        ttl={ttl}
      />
      <div className={styles.chatContainer}>
        <MessageList messages={messages} loading={loading} />
        <MessageInput
          onSendMessage={sendMessage}
          loading={loading}
          streaming={streaming}
          onStopStreaming={stopStreaming}
        />
      </div>
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
    </div>
  );
};