import { SharedModule } from './../shared/shared.module';
import { AdministracionCitasComponent } from './administracion-citas/administracion-citas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontologoRoutingModule } from './odontologo-routing.module';
import { OdontologoComponent } from './odontologo.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { MisPacientesComponent } from './mis-pacientes/mis-pacientes.component';
import { AdministrarHistoriasComponent } from './administrar-historias/administrar-historias.component';
import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { EstadoDeCuentaComponent } from './estado-de-cuenta/estado-de-cuenta.component';
import { MediosPagoComponent } from './medios-pago/medios-pago.component';
import { ConfiPaypalComponent } from './confi-paypal/confi-paypal.component';
import { ConfiZelleComponent } from './confi-zelle/confi-zelle.component';
import { ConfiBancoComponent } from './confi-banco/confi-banco.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CrearPacienteComponent } from './administrar-historias/crear-paciente/crear-paciente.component';
import { ListaCitasComponent } from './mis-consultas/lista-citas/lista-citas.component';
import { CrearCitaComponent } from './mis-consultas/crear-cita/crear-cita.component';


@NgModule({
  declarations: [AdministracionCitasComponent, OdontologoComponent, CronogramaComponent, MisPacientesComponent, AdministrarHistoriasComponent, MisConsultasComponent, ComunicacionComponent, EstadoDeCuentaComponent, MediosPagoComponent, ConfiPaypalComponent, ConfiZelleComponent, ConfiBancoComponent, CrearPacienteComponent, ListaCitasComponent, CrearCitaComponent],
  imports: [
    CommonModule,
    OdontologoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OdontologoModule { }
