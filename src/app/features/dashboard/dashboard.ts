import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Agent } from '../../core/models/agent.model';
import { AgentService } from '../../core/services/agent.service';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { StatusBadge } from '../../shared/components/status-badge/status-badge';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, PageHeader, StatusBadge, TimeAgoPipe],
  template: `
    <app-page-header title="Agent Hub Dashboard" subtitle="Live overview of all your agents" />

    <section class="tiles">
      @for (t of tiles(); track t.label) {
        <div class="tile" [class]="t.tone">
          <strong>{{ t.value }}</strong>
          <span>{{ t.label }}</span>
        </div>
      }
    </section>

    <section class="panel">
      <div class="panel-head">
        <h2>Recent agents</h2>
        <a routerLink="/agents">View all</a>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Status</th><th>Version</th><th>Last seen</th></tr></thead>
        <tbody>
          @for (a of recent(); track a.id) {
            <tr>
              <td><a [routerLink]="['/agents', a.id]">{{ a.name }}</a></td>
              <td><app-status-badge [status]="a.status" /></td>
              <td>{{ a.version ?? '-' }}</td>
              <td>{{ a.lastSeenAt | timeAgo }}</td>
            </tr>
          } @empty {
            <tr><td colspan="4" class="empty">No agents to show yet.</td></tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: `
    .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .tile { background: var(--color-surface); border: 1px solid var(--color-border); border-top: 4px solid var(--color-primary);
            border-radius: 10px; padding: 1.25rem; display: flex; flex-direction: column; }
    .tile.accent { border-top-color: var(--color-accent); }
    .tile.danger { border-top-color: var(--color-danger); }
    strong { font-size: 2rem; color: var(--color-primary-dark); }
    span { color: var(--color-muted); }
    .panel { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 10px; overflow: hidden; }
    .panel-head { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem;
                  background: var(--color-primary-soft); }
    h2 { margin: 0; font-size: 1.05rem; color: var(--color-primary-dark); }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: .75rem 1.25rem; border-bottom: 1px solid var(--color-border); }
    th { font-size: .8rem; text-transform: uppercase; color: var(--color-muted); }
    .empty { text-align: center; color: var(--color-muted); }
  `,
})
export class Dashboard {
  private readonly agents = toSignal(
    inject(AgentService).list().pipe(catchError(() => of([] as Agent[]))),
    { initialValue: [] as Agent[] },
  );

  protected readonly recent = computed(() => this.agents().slice(0, 5));

  protected readonly tiles = computed(() => {
    const a = this.agents();
    const n = (s: string) => a.filter((x) => x.status === s).length;
    return [
      { label: 'Total agents', value: a.length, tone: '' },
      { label: 'Online', value: n('online'), tone: '' },
      { label: 'Busy', value: n('busy'), tone: 'accent' },
      { label: 'Errors', value: n('error'), tone: 'danger' },
    ];
  });
}
