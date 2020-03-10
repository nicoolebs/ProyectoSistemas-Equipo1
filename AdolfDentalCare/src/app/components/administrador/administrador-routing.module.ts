import { PrincipalComponent } from './principal/principal.component';
import { AdministradorComponent } from './administrador.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { PorcentajesComponent } from './porcentajes/porcentajes.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CitasPorOdontologoComponent } from './estadisticas/citas-por-odontologo/citas-por-odontologo.component';
import { CitasPorFechaComponent } from './estadisticas/citas-por-fecha/citas-por-fecha.component';
import { CitasPendientesComponent } from './estadisticas/citas-pendientes/citas-pendientes.component';
import { IngresosComponent } from './estadisticas/ingresos/ingresos.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard-admin',
    pathMatch: 'full'
  },
  {
    path: '', component: AdministradorComponent, children: [
      {
        path: 'dashboard-admin',
        component: PrincipalComponent
      },
      {
        path: 'dashboard-admin/administrar-usuarios',
        component: AdministrarUsuariosComponent
      },
      {
        path: 'dashboard-admin/ver-usuarios',
        component: VerUsuariosComponent
      },
      {
        path: 'dashboard-admin/porcentajes-de-cobro',
        component: PorcentajesComponent
      },
      {
        path: 'dashboard-admin/estadisticas',
        component: EstadisticasComponent
      },
      {
        path: 'dashboard-admin/estadisticas/citas-por-odontólogo',
        component: CitasPorOdontologoComponent
      },
      {
        path: 'dashboard-admin/estadisticas/citas-por-fecha',
        component: CitasPorFechaComponent
      },
      {
        path: 'dashboard-admin/estadisticas/citas-pendientes',
        component: CitasPendientesComponent
      },
      {
        path: 'dashboard-admin/estadisticas/ingresos',
        component: IngresosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
