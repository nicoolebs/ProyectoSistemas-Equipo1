import { SharedModule } from './../shared/shared.module';
import { PrincipalComponent } from './principal/principal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { PorcentajesComponent } from './porcentajes/porcentajes.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CitasPorOdontologoComponent } from './estadisticas/citas-por-odontologo/citas-por-odontologo.component';
import { CitasPorFechaComponent } from './estadisticas/citas-por-fecha/citas-por-fecha.component';
import { CitasPendientesComponent } from './estadisticas/citas-pendientes/citas-pendientes.component';
import { IngresosComponent } from './estadisticas/ingresos/ingresos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';


@NgModule({
  declarations: [PrincipalComponent, AdministradorComponent, AdministrarUsuariosComponent, VerUsuariosComponent, PorcentajesComponent, EstadisticasComponent, CitasPorOdontologoComponent, CitasPorFechaComponent, CitasPendientesComponent, IngresosComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AngularFireFunctions]
})
export class AdministradorModule { }
