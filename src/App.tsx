// src/App.tsx
// import React from 'react';
import { useSession } from './hooks/useSession';
import { ChatScreen } from './components/ChatScreen/ChatScreen';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { ErrorScreen } from './components/ErrorScreen/ErrorScreen';
import './styles/global.scss';

function App() {
  const { session, loading, error, clearSession } = useSession();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={clearSession} />;
  }

  if (!session) {
    return <ErrorScreen error="Failed to create session" onRetry={clearSession} />;
  }

  return (
    <>
      <header className="newsify-header">
        <span className="newsify-title">Newsify</span>
      </header>
      <div className="chat-panel">
        <ChatScreen 
          sessionId={session.id} 
          onResetSession={clearSession}
          ttl={session.ttl}
        />
      </div>
    </>
  );
}

export default App;