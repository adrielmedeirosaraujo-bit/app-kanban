import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'todo',
        loadChildren: () => import('../pages/todo/todo.module').then(m => m.TodoPageModule)
      },
      {
        path: 'doing',
        loadChildren: () => import('../pages/doing/doing.module').then(m => m.DoingPageModule)
      },
      {
        path: 'done',
        loadChildren: () => import('../pages/done/done.module').then(m => m.DonePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/todo',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
