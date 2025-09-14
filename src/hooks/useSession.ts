// src/hooks/useSession.ts
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Session } from '../types';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const savedSessionId = localStorage.getItem('sessionId');
        
        if (savedSessionId) {
          // Verify the session still exists
          try {
            await apiService.getSessionHistory(savedSessionId);
            setSession({ id: savedSessionId, ttl: 86400, createdAt: new Date().toISOString() });
          } catch (err) {
            console.log('first', err);
            // Session doesn't exist or is expired, create a new one
            await createNewSession();
          }
        } else {
          await createNewSession();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize session');
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, []);

  const createNewSession = async () => {
    try {
      const newSession = await apiService.createSession();
      console.log('Session created:', newSession);
      console.log('Saving sessionId to localStorage:', newSession.id);
      setSession({
        id: newSession.id,
        ttl: newSession.ttl ?? 86400,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('sessionId', newSession.id);
      setError(null);
      return newSession;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create session');
    }
  };

  const clearSession = async () => {
    if (session) {
      try {
        await apiService.clearSession(session.id);
      } catch (err) {
        console.error('Failed to clear session on server:', err);
      }
    }
    
    localStorage.removeItem('sessionId');
    setSession(null);
    
    // Create a new session
    return createNewSession();
  };

  return {
    session,
    loading,
    error,
    clearSession,
    refreshSession: createNewSession,
  };
};