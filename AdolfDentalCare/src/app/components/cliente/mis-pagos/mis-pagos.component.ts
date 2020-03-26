import { Component, OnInit} from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { FirestoreService } from '../../../services/firestore.service';

declare let paypal: any;

@Component({
  selector: 'app-mis-pagos',
  templateUrl: './mis-pagos.component.html',
  styleUrls: ['./mis-pagos.component.css']
})
export class MisPagosComponent implements OnInit{

  deuda: number;
  pagosPendientes: any[] = [];


  constructor(
    private auth: AutentificacionService,
    private baseDatos: FirestoreService) { }

  ngOnInit(): void {
    for (let index = 0; index < this.auth.usuarioLogg.paciente.historia.length; index++) {

      this.baseDatos.getDocumento(this.auth.usuarioLogg.paciente.historia[index], 'Citas').subscribe(cita => {

        if (cita.data().paga === false && cita.data().costo !== 0) {
          this.pagosPendientes.push(cita.data());
        }

      });

    }

  }

}
