import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Dashboard - SAM Agent Hub',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'agents',
        title: 'Agents - SAM Agent Hub',
        loadComponent: () => import('./features/agents/agent-list/agent-list').then((m) => m.AgentList),
      },
      {
        path: 'agents/:id',
        title: 'Agent detail - SAM Agent Hub',
        loadComponent: () => import('./features/agents/agent-detail/agent-detail').then((m) => m.AgentDetail),
      },
    ],
  },
  {
    path: '**',
    title: 'Not found - SAM Agent Hub',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
