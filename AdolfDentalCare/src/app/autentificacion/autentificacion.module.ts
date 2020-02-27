import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    RegistroComponent,
    IniciarSesionComponent
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
