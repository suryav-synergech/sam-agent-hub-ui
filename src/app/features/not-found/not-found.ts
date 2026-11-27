import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `<div class="c"><h1>404</h1><p>Page not found.</p><a routerLink="/">Go home</a></div>`,
  styles: `.c { display: grid; place-items: center; min-height: 100vh; text-align: center; }`,
})
export class NotFound {}
