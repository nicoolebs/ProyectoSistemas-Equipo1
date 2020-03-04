import { PrincipalComponent } from './principal/principal.component';
import { AdministradorComponent } from './administrador.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard-administrador',
    pathMatch: 'full'
  },
  {
    path: '', component: AdministradorComponent, children: [
      {
        path: 'dashboard-administrador',
        component: PrincipalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
