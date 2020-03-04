import { AngularFireAuth } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { AutentificacionComponent } from './autentificacion.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AutentificacionRoutingModule
  ],
  declarations: [
    RegistroComponent,
    IniciarSesionComponent,
    AutentificacionComponent
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
