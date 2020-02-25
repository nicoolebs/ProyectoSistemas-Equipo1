import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisCitasComponent } from './mis-citas/mis-citas.component';
import { MisPagosComponent } from './mis-pagos/mis-pagos.component';
import { MiHistoriaComponent } from './mi-historia/mi-historia.component';



@NgModule({
  declarations: [MiPerfilComponent, MisCitasComponent, MisPagosComponent, MiHistoriaComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MiPerfilComponent,
    MisCitasComponent,
    MisPagosComponent,
    MiHistoriaComponent
  ]
})
export class ClienteModule { }
