// src/types/index.ts
export interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  sources?: Source[];
  messageId?: string;
}

export interface Source {
  title: string;
  url: string;
  similarity: number;
}

export interface Session {
  id: string;
  ttl: number;
  createdAt: string;
}

export interface QueryResponse {
  messageId: string;
  response: string;
  sources: Source[];
}