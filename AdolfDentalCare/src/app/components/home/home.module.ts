import { SharedModule } from './../shared/shared.module';
import { SliderComponent } from './inicio/slider/slider.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ContactoComponent } from './contacto/contacto.component';
import { NuestroPortalComponent } from './nuestro-portal/nuestro-portal.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    InicioComponent,
    NuestroPortalComponent,
    ContactoComponent,
    ServiciosComponent,
    SobreNosotrosComponent,
    SliderComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    InicioComponent,
    NuestroPortalComponent,
    ContactoComponent,
    ServiciosComponent,
    SobreNosotrosComponent,
    SliderComponent
  ],
})
export class HomeModule { }
