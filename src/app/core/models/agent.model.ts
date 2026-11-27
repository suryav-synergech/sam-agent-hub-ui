export type AgentStatus = 'online' | 'offline' | 'busy' | 'error';

export interface Agent {
  id: string;
  name: string;
  description?: string;
  status: AgentStatus;
  version?: string;
  lastSeenAt?: string; // ISO date
}
