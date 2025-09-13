// src/components/MessageList/MessageList.tsx
import React from 'react';
import { Message } from '../../types';
import { MessageItem } from '../MessageItem/MessageItem';
import styles from './MessageList.module.scss';

interface MessageListProps {
  messages: Message[];
  loading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
  const messageEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.messageList} aria-live="polite">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {loading && (
        <div className={styles.typingIndicator}>
          <div className={styles.typingAnimation}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};