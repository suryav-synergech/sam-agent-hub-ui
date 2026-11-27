import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Header, Sidebar],
  template: `
    <app-sidebar />
    <div class="main">
      <app-header />
      <main><router-outlet /></main>
    </div>
  `,
  styles: `
    :host { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }
    .main { display: flex; flex-direction: column; min-width: 0; }
    main { padding: 1.5rem; }
  `,
})
export class Shell {}
