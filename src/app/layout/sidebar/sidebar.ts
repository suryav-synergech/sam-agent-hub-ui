import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="brand"><span class="logo">S</span> SAM Agent Hub</div>
    <nav>
      @for (item of items; track item.path) {
        <a [routerLink]="item.path" routerLinkActive="active">{{ item.label }}</a>
      }
    </nav>
  `,
  styles: `
    :host { background: var(--color-primary-dark); color: #fff; padding: 1rem; display: block; }
    .brand { display: flex; align-items: center; gap: .6rem; font-weight: 700; font-size: 1.1rem; margin-bottom: 1.75rem; }
    .logo { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 8px;
            background: var(--color-accent); color: var(--color-primary-dark); font-weight: 800; }
    nav { display: flex; flex-direction: column; gap: .25rem; }
    a { color: #bfdbfe; padding: .55rem .75rem; border-radius: 6px; text-decoration: none; border-left: 3px solid transparent; }
    a:hover { background: rgba(255,255,255,.1); color: #fff; }
    a.active { background: rgba(255,255,255,.14); color: #fff; border-left-color: var(--color-accent); }
  `,
})
export class Sidebar {
  protected readonly items = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/agents', label: 'Agents' },
  ];
}
