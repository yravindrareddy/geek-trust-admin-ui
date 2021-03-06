import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'admin'},
  {path: 'admin', component: AdminComponent},
  {path: 'table', component: TableComponent},
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
