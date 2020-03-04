import { ContactoComponent } from './contacto/contacto.component';
import { NuestroPortalComponent } from './nuestro-portal/nuestro-portal.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'sobre-nosotros',
        component: SobreNosotrosComponent
      },
      {
        path: 'servicios',
        component: ServiciosComponent
      },
      {
        path: 'nuestro-portal',
        component: NuestroPortalComponent
      },
      {
        path: 'contacto',
        component: ContactoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
