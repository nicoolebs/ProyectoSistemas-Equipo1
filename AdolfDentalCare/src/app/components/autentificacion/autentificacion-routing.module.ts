import { ClienteComponent } from './../cliente/cliente.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { AutentificacionComponent } from './autentificacion.component';


const routes: Routes = [{
  path: '', component: AutentificacionComponent, children: [
    {
      path: 'iniciar-sesion',
      component: IniciarSesionComponent
    },
    {
      path: 'registro',
      component: RegistroComponent
    }
  ]
},
{
  path: 'dashboard-paciente', component: ClienteComponent, children: [
    {
      path: '',
      component: ClienteComponent
    }
  ]
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
    }
  ]
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
    }
  ]
},
{
path: '',
redirectTo: '/login/iniciar-sesion',
pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutentificacionRoutingModule { }
