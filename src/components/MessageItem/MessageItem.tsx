// src/components/MessageItem/MessageItem.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../types';
import styles from './MessageItem.module.scss';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
    // Typing effect for assistant messages
    const [typedContent, setTypedContent] = React.useState(message.content);
    React.useEffect(() => {
      if (message.type !== 'assistant') {
        setTypedContent(message.content);
        return;
      }
      setTypedContent('');
      let i = 0;
      const interval = setInterval(() => {
        setTypedContent(message.content.slice(0, i));
        i++;
        if (i > message.content.length) clearInterval(interval);
      }, 18); // Adjust speed here
      return () => clearInterval(interval);
    }, [message.content, message.type]);

  return (
    <div className={`${styles.message} ${styles[message.type]}`}>
      <div className={styles.messageHeader}>
        <span className={styles.sender}>
          {message.type === 'user' ? 'You ' :
            message.type === 'assistant' ? 'Assistant ' : 'System'}
        </span>
        <span className={styles.timestamp}>{formatTime(message.timestamp)}</span>
      </div>
      <div className={styles.messageContent}>
        {message.type === 'assistant' ? (
          <ReactMarkdown>{typedContent}</ReactMarkdown>
        ) : (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        )}
      </div>
      {message.sources && message.sources.length > 0 && (
        <div className={styles.sources}>
          <div className={styles.sourcesTitle}>Sources:</div>
          {message.sources.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLink}
            >
              {source.title || source.url}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};