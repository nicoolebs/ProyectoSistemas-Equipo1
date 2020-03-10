import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { MiHistoriaComponent } from './mi-historia/mi-historia.component';
import { MisPagosComponent } from './mis-pagos/mis-pagos.component';
import { MisCitasComponent } from './mis-citas/mis-citas.component';
import { PagarComponent } from './pagar/pagar.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard-paciente/mi-perfil',
    pathMatch: 'full'
  },
  {
    path: '', component: ClienteComponent, children: [
      {
        path: 'dashboard-paciente/mi-perfil',
        component: MiPerfilComponent
      },
      {
        path: 'dashboard-paciente/mi-historia',
        component: MiHistoriaComponent
      },
      {
        path: 'dashboard-paciente/mis-pagos',
        component: MisPagosComponent
      },
      {
        path: 'dashboard-paciente/citas-paciente',
        component: MisCitasComponent
      },
      {
        path: 'dashboard-paciente/mis-pagos/pagar',
        component: PagarComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule { }
