// src/hooks/useChat.ts
import { useState, useCallback, useRef } from 'react';
import { Message, QueryResponse, Source } from '../types';
import { apiService } from '../services/api';

export const useChat = (sessionId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [streaming, setStreaming] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const loadHistory = useCallback(async () => {
        try {
            const history = await apiService.getSessionHistory(sessionId);
            setMessages(history);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load chat history');
        }
    }, [sessionId]);

    const sendMessage = useCallback(async (content: string, k: number = 5) => {
        if (!content.trim() || loading) return;

        setLoading(true);
        setError(null);

        // Add user message optimistically
        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: content.trim(),
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, userMessage]);

        await sendMessageNonStreaming(content, k);
    }, [sessionId, loading]);

    const sendMessageNonStreaming = async (content: string, k: number = 5) => {
        try {
            abortControllerRef.current = new AbortController();

            const response: QueryResponse = await apiService.postQuery(
                sessionId,
                content.trim(),
                k,
                false
            );

            const assistantMessage: Message = {
                id: Date.now().toString(),
                type: 'assistant',
                content: response.response,
                timestamp: new Date().toISOString(),
                sources: response.sources,
                messageId: response.messageId,
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                setError(err instanceof Error ? err.message : 'Failed to send message');

                // Remove optimistic message on error
                setMessages(prev => prev.filter(msg => msg.type !== 'user' || msg.content !== content.trim()));
            }
        } finally {
            setLoading(false);
            abortControllerRef.current = null;
        }
    };

    const stopStreaming = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setStreaming(false);
        setLoading(false);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        messages,
        loading,
        streaming,
        error,
        sendMessage,
        loadHistory,
        stopStreaming,
        clearError,
    };
};