import { AdministradorComponent } from './../administrador/administrador.component';
import { ClienteModule } from './../cliente/cliente.module';
import { ClienteComponent } from './../cliente/cliente.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { AutentificacionComponent } from './autentificacion.component';
import { OdontologoComponent } from '../odontologo/odontologo.component';
import { AdministradorModule } from '../administrador/administrador.module';
import { CambioDeClaveComponent } from './cambio-de-clave/cambio-de-clave.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/iniciar-sesion',
    pathMatch: 'full'
  },
  {
    path: '', component: AutentificacionComponent, children: [
      {
        path: 'iniciar-sesion',
        component: IniciarSesionComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: 'cambio-de-clave',
        component: CambioDeClaveComponent
      }
    ]
  },
{
  path: '', component: ClienteComponent, children: [
    { path: 'paciente', loadChildren: () => import(`../cliente/cliente.module`).then(m => m.ClienteModule) },
  ]
},
{
  path: '', component: OdontologoComponent, children: [
    { path: 'odontologo', loadChildren: () => import(`../odontologo/odontologo.module`).then(m => m.OdontologoModule) },
  ]
},
{
  path: '', component: AdministradorComponent, children: [
    { path: 'administrador', loadChildren: () => import(`../administrador/administrador.module`).then(m => m.AdministradorModule) },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutentificacionRoutingModule { }
