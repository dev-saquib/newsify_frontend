// src/services/api.ts
import { Message, Session, QueryResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async createSession(): Promise<Session> {
    const response = await fetch(`${this.baseUrl}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.statusText}`);
    }

    return response.json();
  }

  async getSessionHistory(sessionId: string): Promise<Message[]> {
    const response = await fetch(`${this.baseUrl}/session/${sessionId}/history`);

    if (!response.ok) {
      throw new Error(`Failed to get session history: ${response.statusText}`);
    }

    const data = await response.json();
    return data.history || [];
  }

  async postQuery(
    sessionId: string,
    query: string,
    k: number = 5,
    stream: boolean = true
  ): Promise<QueryResponse> {
    const response = await fetch(`${this.baseUrl}/session/${sessionId}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, k, stream }),
    });

    if (!response.ok) {
      throw new Error(`Failed to post query: ${response.statusText}`);
    }

    return response.json();
  }

  async clearSession(sessionId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/session/${sessionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to clear session: ${response.statusText}`);
    }
  }

  // WebSocket connection for streaming
  createWebSocketConnection(sessionId: string, onMessage: (data: any) => void) {
    const wsUrl = this.baseUrl.replace('http', 'ws') + `/session/${sessionId}/stream`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return ws;
  }
}

export const apiService = new ApiService();