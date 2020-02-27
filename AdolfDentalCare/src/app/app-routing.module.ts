import { MiPerfilComponent } from './cliente/mi-perfil/mi-perfil.component';
import { ContactoComponent } from './home/contacto/contacto.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SobreNosotrosComponent } from './home/sobre-nosotros/sobre-nosotros.component';
import { ServiciosComponent } from './home/servicios/servicios.component';
import { NuestroPortalComponent } from './home/nuestro-portal/nuestro-portal.component';
import { IniciarSesionComponent } from './autentificacion/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './autentificacion/registro/registro.component';
import { MisCitasComponent } from './cliente/mis-citas/mis-citas.component';
import { MiHistoriaComponent } from './cliente/mi-historia/mi-historia.component';
import { MisPagosComponent } from './cliente/mis-pagos/mis-pagos.component';


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
  {path: 'mis-citas-paciente', component: MisCitasComponent},
  {path: 'mi-historia-paciente', component: MiHistoriaComponent},
  {path: 'mis-pagos-paciente', component: MisPagosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
