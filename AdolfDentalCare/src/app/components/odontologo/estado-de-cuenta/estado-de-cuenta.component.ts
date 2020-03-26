import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { AutentificacionService } from '../../../services/autentificacion.service';

@Component({
  selector: 'app-estado-de-cuenta',
  templateUrl: './estado-de-cuenta.component.html',
  styleUrls: ['./estado-de-cuenta.component.css']
})
export class EstadoDeCuentaComponent implements OnInit {

  pagosPendientes: any[] = [];
  facturas: any[] = [];
  doctor: any;
  seleccionado = false;

  pacienteActivo: any;
  pacientes: any[] = [];
  deuda = 0;
  ingresos = 0;

  constructor(private baseDatos: FirestoreService, private auth: AutentificacionService) { }

  ngOnInit(): void {

    this.doctor = this.auth.usuarioLogg;

    // Obtengo ingresos y deuda
    this.baseDatos.getDocumentos('Citas').subscribe (citas => {

      let agendaCitas = [];

      for (let index = 0; index < citas.length; index++) {

        agendaCitas.push(citas[index].payload.doc.data());
      }

      agendaCitas = agendaCitas.filter(filtro => (filtro.doctor === this.auth.usuarioLogg.uid) && (filtro.costo !== 0));

      for (let index = 0; index < agendaCitas.length; index++) {

        if (agendaCitas[index].paga !== true) {
          this.deuda = this.deuda + agendaCitas[index].costo;
        } else {
          this.ingresos = this.ingresos + agendaCitas[index].costo;
        }

      }



    });

    for (let index = 0; index < this.doctor.doctor.pacientes.length; index++) {

      this.baseDatos.getDocumento(this.doctor.doctor.pacientes[index], 'Usuarios').subscribe(paciente => {
        this.pacientes.push(paciente.data());
      });

    }

  }

  verEstado() {

    this.seleccionado = true;

    this.baseDatos.getDocumentos('Citas').subscribe(citasPaciente => {

      let citas = [];

      for (let index = 0; index < citasPaciente.length; index++) {

        citas.push(citasPaciente[index].payload.doc.data());

      }

      this.pagosPendientes = citas.filter(filtro => (filtro.costo !== 0) && (filtro.paga === false) && (filtro.paciente === this.pacienteActivo.substring(0, 28)));

    });

    this.baseDatos.getDocumentos('Facturas').subscribe(facturasPaciente => {

      this.facturas = [];

      for (let index = 0; index < facturasPaciente.length; index++) {

        this.facturas.push(facturasPaciente[index].payload.doc.data());

      }

      this.facturas = this.facturas.filter(filtro => filtro.paciente === this.pacienteActivo.substring(0, 28));

      console.log(this.facturas);

    });



  }

}
