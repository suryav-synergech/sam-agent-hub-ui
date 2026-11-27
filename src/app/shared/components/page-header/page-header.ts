import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <header class="ph">
      <div>
        <h1>{{ title() }}</h1>
        @if (subtitle()) { <p>{{ subtitle() }}</p> }
      </div>
      <ng-content />
    </header>
  `,
  styles: `
    .ph { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    h1 { margin: 0; font-size: 1.5rem; }
    p { margin: .25rem 0 0; color: var(--color-muted); }
  `,
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
