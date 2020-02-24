import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RegistroComponent,
    IniciarSesionComponent
  ],
  exports: [
    IniciarSesionComponent,
    RegistroComponent
  ]
})
export class AutentificacionModule { }
