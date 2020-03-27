import { SharedModule } from './../shared/shared.module';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { MisCitasComponent } from './mis-citas/mis-citas.component';
import { MisPagosComponent } from './mis-pagos/mis-pagos.component';
import { MiHistoriaComponent } from './mi-historia/mi-historia.component';
import { FormsModule } from '@angular/forms';
import { ClienteComponent } from './cliente.component';
import { PagarComponent } from './pagar/pagar.component';
import { CrearCitaComponent } from './mis-citas/crear-cita/crear-cita.component';
import { CitasComponent } from './mis-citas/citas/citas.component';
import { ModificarPerfilComponent } from './mi-perfil/modificar-perfil/modificar-perfil.component';
import { PaypalComponent } from './pagar/paypal/paypal.component';



@NgModule({
  declarations: [MiPerfilComponent, MisCitasComponent, MisPagosComponent, MiHistoriaComponent, ClienteComponent, PagarComponent, CrearCitaComponent, CitasComponent, ModificarPerfilComponent, PaypalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ClienteRoutingModule
  ],
  exports: [
    MiPerfilComponent,
    MisCitasComponent,
    MisPagosComponent,
    MiHistoriaComponent
  ]
})
export class ClienteModule { }
