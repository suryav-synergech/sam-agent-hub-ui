import { Component, input } from '@angular/core';
import { AgentStatus } from '../../../core/models/agent.model';

@Component({
  selector: 'app-status-badge',
  template: `<span class="badge" [class]="status()">{{ status() }}</span>`,
  styles: `
    .badge { padding: .15rem .6rem; border-radius: 999px; font-size: .75rem; font-weight: 600; text-transform: capitalize; color: #fff; }
    .online { background: var(--color-primary); }
    .offline { background: var(--color-muted); }
    .busy { background: var(--color-accent); color: var(--color-primary-dark); }
    .error { background: var(--color-danger); }
  `,
})
export class StatusBadge {
  readonly status = input.required<AgentStatus>();
}
