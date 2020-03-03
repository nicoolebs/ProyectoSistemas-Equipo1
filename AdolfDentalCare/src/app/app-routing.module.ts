import { AdministracionCitasComponent } from './components/odontologo/administracion-citas/administracion-citas.component';
import { MiPerfilComponent } from './components/cliente/mi-perfil/mi-perfil.component';
import { ContactoComponent } from './components/home/contacto/contacto.component';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SobreNosotrosComponent } from './components/home/sobre-nosotros/sobre-nosotros.component';
import { ServiciosComponent } from './components/home/servicios/servicios.component';
import { NuestroPortalComponent } from './components/home/nuestro-portal/nuestro-portal.component';
import { IniciarSesionComponent } from './components/autentificacion/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './components/autentificacion/registro/registro.component';
import { MisCitasComponent } from './components/cliente/mis-citas/mis-citas.component';
import { MiHistoriaComponent } from './components/cliente/mi-historia/mi-historia.component';
import { MisPagosComponent } from './components/cliente/mis-pagos/mis-pagos.component';
import { PrincipalComponent } from './components/administrador/principal/principal.component';


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'sobre-nosotros', component: SobreNosotrosComponent},
  {path: 'servicios', component: ServiciosComponent},
  {path: 'nuestro-portal', component: NuestroPortalComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'iniciar-sesion', component: IniciarSesionComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'dashboard-paciente', component: MiPerfilComponent},
  {path: 'dashboard-odontologo', component: AdministracionCitasComponent},
  {path: 'dashboard-administrador', component: PrincipalComponent},
  {path: 'mis-citas-paciente', component: MisCitasComponent},
  {path: 'mi-historia-paciente', component: MiHistoriaComponent},
  {path: 'mis-pagos-paciente', component: MisPagosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
