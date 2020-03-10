import { MisPacientesComponent } from './mis-pacientes/mis-pacientes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OdontologoComponent } from './odontologo.component';
import { AdministracionCitasComponent } from './administracion-citas/administracion-citas.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { AdministrarHistoriasComponent } from './administrar-historias/administrar-historias.component';
import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { EstadoDeCuentaComponent } from './estado-de-cuenta/estado-de-cuenta.component';
import { MediosPagoComponent } from './medios-pago/medios-pago.component';
import { ConfiPaypalComponent } from './confi-paypal/confi-paypal.component';
import { ConfiZelleComponent } from './confi-zelle/confi-zelle.component';
import { ConfiBancoComponent } from './confi-banco/confi-banco.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard-odontólogo/administrar-citas',
    pathMatch: 'full'
  },
  {
    path: '', component: OdontologoComponent, children: [
      {
        path: 'dashboard-odontólogo/administrar-citas',
        component: AdministracionCitasComponent
      },
      {
        path: 'dashboard-odontólogo/cronograma',
        component: CronogramaComponent
      },
      {
        path: 'dashboard-odontólogo/mis-pacientes',
        component: MisPacientesComponent
      },
      {
        path: 'dashboard-odontólogo/administrar-historias',
        component: AdministrarHistoriasComponent
      },
      {
        path: 'dashboard-odontólogo/mis-consultas',
        component: MisConsultasComponent
      },
      {
        path: 'dashboard-odontólogo/comunicacion',
        component: ComunicacionComponent
      },
      {
        path: 'dashboard-odontólogo/estado-de-cuenta',
        component: EstadoDeCuentaComponent
      },
      {
        path: 'dashboard-odontólogo/medios-de-pago',
        component: MediosPagoComponent
      },
      {
        path: 'dashboard-odontólogo/medios-de-pago/paypal',
        component: ConfiPaypalComponent
      },
      {
        path: 'dashboard-odontólogo/medios-de-pago/zelle',
        component: ConfiZelleComponent
      },
      {
        path: 'dashboard-odontólogo/medios-de-pago/banco',
        component: ConfiBancoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdontologoRoutingModule { }
