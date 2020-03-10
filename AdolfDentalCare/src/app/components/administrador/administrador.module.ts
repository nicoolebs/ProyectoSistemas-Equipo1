import { SharedModule } from './../shared/shared.module';
import { PrincipalComponent } from './principal/principal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';


@NgModule({
  declarations: [PrincipalComponent, AdministradorComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule
  ]
})
export class AdministradorModule { }
