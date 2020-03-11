import { AngularFireAuth } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { AutentificacionComponent } from './autentificacion.component';
import { CambioDeClaveComponent } from './cambio-de-clave/cambio-de-clave.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AutentificacionRoutingModule
  ],
  declarations: [
    RegistroComponent,
    IniciarSesionComponent,
    AutentificacionComponent,
    CambioDeClaveComponent
  ],
  exports: [
    IniciarSesionComponent,
    RegistroComponent
  ],
  providers: [
    AngularFireAuth
  ]
})
export class AutentificacionModule { }
