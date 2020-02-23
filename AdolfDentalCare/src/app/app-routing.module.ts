import { ContactoComponent } from './home/contacto/contacto.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SobreNosotrosComponent } from './home/sobre-nosotros/sobre-nosotros.component';
import { ServiciosComponent } from './home/servicios/servicios.component';
import { NuestroPortalComponent } from './home/nuestro-portal/nuestro-portal.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'sobre-nosotros', component: SobreNosotrosComponent},
  {path: 'servicios', component: ServiciosComponent},
  {path: 'nuestro-portal', component: NuestroPortalComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: '', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
