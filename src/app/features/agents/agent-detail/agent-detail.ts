import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { AgentService } from '../../../core/services/agent.service';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-agent-detail',
  imports: [RouterLink, PageHeader, StatusBadge, TimeAgoPipe],
  template: `
    @if (agent(); as a) {
      <app-page-header [title]="a.name" [subtitle]="a.description" />
      <p><app-status-badge [status]="a.status" /> &middot; v{{ a.version ?? '?' }} &middot; seen {{ a.lastSeenAt | timeAgo }}</p>
    } @else {
      <p>Agent not found or loading...</p>
    }
    <a routerLink="/agents">&larr; Back to agents</a>
  `,
})
export class AgentDetail {
  readonly id = input.required<string>(); // bound from :id via withComponentInputBinding
  private readonly svc = inject(AgentService);

  protected readonly agent = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.svc.get(id).pipe(catchError(() => of(null))))),
  );
}
