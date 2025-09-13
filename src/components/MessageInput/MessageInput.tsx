// src/components/MessageInput/MessageInput.tsx
import React, { useState, useRef } from 'react';
import styles from './MessageInput.module.scss';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
  streaming: boolean;
  onStopStreaming: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  loading,
  streaming,
  onStopStreaming,
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  return (
    <form className={styles.messageInput} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          disabled={loading}
          className={styles.textarea}
          aria-label="Message input"
        />
        {streaming ? (
          <button
            type="button"
            onClick={onStopStreaming}
            className={styles.stopButton}
            aria-label="Stop generating response"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!message.trim() || loading}
            className={styles.sendButton}
            aria-label="Send message"
          >
            Send
          </button>
        )}
      </div>
    </form>
  );
};