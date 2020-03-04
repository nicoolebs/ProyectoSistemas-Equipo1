import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { MiHistoriaComponent } from './mi-historia/mi-historia.component';
import { MisPagosComponent } from './mis-pagos/mis-pagos.component';
import { MisCitasComponent } from './mis-citas/mis-citas.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard-paciente',
    pathMatch: 'full'
  },
  {
    path: '', component: ClienteComponent, children: [
      {
        path: 'dashboard-paciente',
        component: MiPerfilComponent
      },
      {
        path: 'historia-paciente',
        component: MiHistoriaComponent
      },
      {
        path: 'pagos-paciente',
        component: MisPagosComponent
      },
      {
        path: 'citas-paciente',
        component: MisCitasComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule { }
