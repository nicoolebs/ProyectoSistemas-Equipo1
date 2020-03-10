import { SharedModule } from './../shared/shared.module';
import { AdministracionCitasComponent } from './administracion-citas/administracion-citas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontologoRoutingModule } from './odontologo-routing.module';
import { OdontologoComponent } from './odontologo.component';


@NgModule({
  declarations: [AdministracionCitasComponent, OdontologoComponent],
  imports: [
    CommonModule,
    OdontologoRoutingModule,
    SharedModule
  ]
})
export class OdontologoModule { }
