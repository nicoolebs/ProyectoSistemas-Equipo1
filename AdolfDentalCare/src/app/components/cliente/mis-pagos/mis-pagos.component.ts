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
  facturas: any[] = [];
  detalle: boolean[] = [];


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

    this.baseDatos.getDocumentos('Facturas').subscribe(facturas => {

      for (let index = 0; index < facturas.length; index++) {

        this.facturas.push(facturas[index].payload.doc.data());

      }

      this.facturas = this.facturas.filter(filtro => filtro.paciente == this.auth.usuarioLogg.uid);

      for (let index = 0; index < this.facturas.length; index++) {
        this.detalle.push(false);
      }

      console.log(this.detalle);

    });



  }

  verDetalle(i: number) {

    this.detalle[i] = !this.detalle[i];
  }

}
