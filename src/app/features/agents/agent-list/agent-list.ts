import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';
import { Agent } from '../../../core/models/agent.model';
import { AgentService } from '../../../core/services/agent.service';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

interface State {
  loading: boolean;
  error: boolean;
  data: Agent[];
}

@Component({
  selector: 'app-agent-list',
  imports: [RouterLink, PageHeader, StatusBadge, TimeAgoPipe],
  template: `
    <app-page-header title="Agents" subtitle="All registered agents" />
    @let s = state();
    @if (s.loading) {
      <p>Loading...</p>
    } @else if (s.error) {
      <p class="error">Failed to load agents.</p>
    } @else {
      <table>
        <thead><tr><th>Name</th><th>Status</th><th>Version</th><th>Last seen</th></tr></thead>
        <tbody>
          @for (a of s.data; track a.id) {
            <tr>
              <td><a [routerLink]="['/agents', a.id]">{{ a.name }}</a></td>
              <td><app-status-badge [status]="a.status" /></td>
              <td>{{ a.version ?? '-' }}</td>
              <td>{{ a.lastSeenAt | timeAgo }}</td>
            </tr>
          } @empty {
            <tr><td colspan="4">No agents found.</td></tr>
          }
        </tbody>
      </table>
    }
  `,
  styles: `
    table { width: 100%; border-collapse: collapse; background: var(--color-surface); border-radius: 10px; overflow: hidden; }
    th, td { text-align: left; padding: .75rem 1rem; border-bottom: 1px solid var(--color-border); }
    .error { color: var(--color-danger); }
  `,
})
export class AgentList {
  protected readonly state = toSignal(
    inject(AgentService).list().pipe(
      map((data): State => ({ loading: false, error: false, data })),
      catchError(() => of<State>({ loading: false, error: true, data: [] })),
      startWith<State>({ loading: true, error: false, data: [] }),
    ),
    { requireSync: true },
  );
}
