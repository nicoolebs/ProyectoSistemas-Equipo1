import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-citas-por-fecha',
  templateUrl: './citas-por-fecha.component.html',
  styleUrls: ['./citas-por-fecha.component.css']
})
export class CitasPorFechaComponent implements OnInit {

  fechaInicial: Date;
  fechaFinal: Date;
  ver = false;

  cantidad: number;
  agendaCitas: any[] = [];

  constructor(private baseDatos: FirestoreService) { }

  ngOnInit(): void {
    this.cantidad = 0;

    this.baseDatos.getDocumentos('Citas').subscribe(citas => {

      this.agendaCitas = [];

      for (let index = 0; index < citas.length; index++) {

        this.agendaCitas.push(citas[index].payload.doc.data());

      }
    });
  }

  verEstadistica() {

    this.cantidad = 0;
    this.fechaFinal = new Date(this.fechaFinal);
    this.fechaInicial = new Date(this.fechaInicial);

    if (this.fechaFinal != undefined && this.fechaInicial != undefined) {

      for (let index = 0; index < this.agendaCitas.length; index++) {

        let fecha = new Date(this.agendaCitas[index].fecha.substring(0, 4), this.agendaCitas[index].fecha.substring(5, 6) - 1, this.agendaCitas[index].fecha.substring(7, 9))

        if (fecha.getTime() <= this.fechaFinal.getTime() && fecha.getTime() >= this.fechaInicial.getTime()) {

          this.cantidad = this.cantidad + 1;
        }

      }

      this.ver = true;

    } else {

      alert('Ingrese un rango de fechas válido.');
      this.ver = false;
    }

  }

}
