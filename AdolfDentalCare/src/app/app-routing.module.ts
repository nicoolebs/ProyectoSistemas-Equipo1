import { AdministracionCitasComponent } from './components/odontologo/administracion-citas/administracion-citas.component';
import { MiPerfilComponent } from './components/cliente/mi-perfil/mi-perfil.component';
import { ContactoComponent } from './components/home/contacto/contacto.component';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarSesionComponent } from './components/autentificacion/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './components/autentificacion/registro/registro.component';
import { MisCitasComponent } from './components/cliente/mis-citas/mis-citas.component';
import { MiHistoriaComponent } from './components/cliente/mi-historia/mi-historia.component';
import { MisPagosComponent } from './components/cliente/mis-pagos/mis-pagos.component';
import { PrincipalComponent } from './components/administrador/principal/principal.component';
import { HomeComponent } from './components/home/home.component';
import { AutentificacionComponent } from './components/autentificacion/autentificacion.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },

    { path: 'home',
    loadChildren: () => import(`./components/home/home.module`).then(m => m.HomeModule) },

    { path: 'login', loadChildren: () => import(`./components/autentificacion/autentificacion.module`).then(m => m.AutentificacionModule) },

  // {path: '', component: InicioComponent},
  // {path: 'iniciar-sesion', component: IniciarSesionComponent},
  // {path: 'registro', component: RegistroComponent},
  // {path: 'dashboard-paciente', component: MiPerfilComponent},
  // {path: 'dashboard-odontologo', component: AdministracionCitasComponent},
  // {path: 'dashboard-administrador', component: PrincipalComponent},
  // {path: 'mis-citas-paciente', component: MisCitasComponent},
  // {path: 'mi-historia-paciente', component: MiHistoriaComponent},
  // {path: 'mis-pagos-paciente', component: MisPagosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
