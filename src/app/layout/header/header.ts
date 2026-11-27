import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <div>
        <strong>Agent Hub</strong>
        <span class="tag">Control Center</span>
      </div>
      <span class="live"><i></i> Live</span>
    </header>
  `,
  styles: `
    header { display: flex; justify-content: space-between; align-items: center; padding: .85rem 1.5rem;
             background: var(--color-surface); border-bottom: 3px solid var(--color-accent); }
    strong { color: var(--color-primary); font-size: 1.1rem; }
    .tag { margin-left: .75rem; padding: .15rem .6rem; border-radius: 999px; font-size: .75rem;
           background: var(--color-accent-soft); color: var(--color-primary-dark); font-weight: 600; }
    .live { display: flex; align-items: center; gap: .4rem; font-size: .85rem; color: var(--color-muted); }
    .live i { width: 8px; height: 8px; border-radius: 50%; background: var(--color-success); }
  `,
})
export class Header {}
