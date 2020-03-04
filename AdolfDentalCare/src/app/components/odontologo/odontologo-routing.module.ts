import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OdontologoComponent } from './odontologo.component';
import { AdministracionCitasComponent } from './administracion-citas/administracion-citas.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard-odontologo',
    pathMatch: 'full'
  },
  {
    path: '', component: OdontologoComponent, children: [
      {
        path: 'dashboard-odontologo',
        component: AdministracionCitasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdontologoRoutingModule { }
