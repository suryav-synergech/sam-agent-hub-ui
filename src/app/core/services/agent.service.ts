import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { Agent } from '../models/agent.model';

@Injectable({ providedIn: 'root' })
export class AgentService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/agents`;

  list(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.url);
  }

  get(id: string): Observable<Agent> {
    return this.http.get<Agent>(`${this.url}/${encodeURIComponent(id)}`);
  }
}
