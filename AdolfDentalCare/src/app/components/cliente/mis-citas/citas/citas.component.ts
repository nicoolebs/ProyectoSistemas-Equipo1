import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../../services/autentificacion.service';
import { Cita } from '../../../../models/cita';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  tieneCita: boolean;
  citaActiva = false;
  cita: Cita;
  doctor: any;
  accion = 0;

  fechaActiva: any;
  horaActiva: any;

  constructor(
    private auth: AutentificacionService,
    private baseDatos: FirestoreService
  ) { }

  ngOnInit(): void {
    this.tieneCita = this.auth.usuarioLogg.paciente.citaProx != '';

    this.baseDatos.getDocumento(this.auth.usuarioLogg.paciente.citaProx, 'Citas').subscribe(data => {
      this.cita = {
        doctor: data.data().doctor,
        paciente: data.data().paciente,
        fecha: data.data().fecha,
        hora: data.data().hora,
        tratamiento: data.data().tratamiento,
        confirmada: data.data().confirmada,
        costo: data.data().costo,
        recipe: data.data().recipe,
        id: data.data().id
      };

      this.baseDatos.getDocumento(this.cita.doctor, 'Usuarios').subscribe(doctor => {
        this.doctor = doctor.data().doctor.nombre + ' ' + doctor.data().doctor.apellido;
        console.log(this.doctor);
      });

    });

  }

  mostrarCita() {

    this.citaActiva = !this.citaActiva;
  }

  cambiarFecha() {

    if (this.accion != 1){

      this.accion = 1;
    } else {

      this.accion = 0;
    }

  }

  cancelarCita() {

    if (this.accion != 2){

      this.accion = 2;
    } else {

      this.accion = 0;
    }
  }

}
