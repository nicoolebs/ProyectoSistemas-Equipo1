import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../../services/autentificacion.service';
import { Cita } from '../../../../models/cita';
import { FirestoreService } from '../../../../services/firestore.service';
import { Router } from '@angular/router';

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
  seleccionada = false;

  fechaActiva: any;
  horaActiva: any;
  horario: any[];

  constructor(
    private auth: AutentificacionService,
    private baseDatos: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tieneCita = this.auth.usuarioLogg.paciente.citaProx !== '';

    if (this.tieneCita) {

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
          id: data.data().id,
          paga: data.data().paga,
          archivo: data.data().archivo
        };

        this.baseDatos.getDocumento(this.cita.doctor, 'Usuarios').subscribe(doctor => {
          this.doctor = doctor.data();
        });

      });

    }

  }

  mostrarCita() {

    this.citaActiva = !this.citaActiva;
  }

  cambiarFecha() {

    if (this.accion !== 1) {

      this.accion = 1;
    } else {

      this.accion = 0;
    }

  }

  verHorario() {

    this.fechaActiva = new Date(this.fechaActiva.substring(0, 4), this.fechaActiva.substring(5, 7) - 1, this.fechaActiva.substring(8, 10));

    // Busco el horario del doctor ese dia
    this.horario = this.doctor.doctor.cronograma[this.fechaActiva.getDay()].horas;

    // Filtrar horario para que solo salgan las horas disponibles
    this.horario = this.horario.filter(horaLibre => horaLibre.libre);

    this.seleccionada = true;
  }

  cancelarCita() {

    if (this.accion !== 2) {

      this.accion = 2;
    } else {

      this.accion = 0;
    }
  }

  cambiar() {

    this.cita.fecha =
    this.fechaActiva.getUTCFullYear().toString() + '-'
    + (this.fechaActiva.getUTCMonth() + 1) + '-' +
    this.fechaActiva.getUTCDate().toString();

    this.cita.hora = this.horaActiva;

    this.baseDatos.updateDocumento(this.cita.id, this.cita, 'Citas').then(corr => {
      alert('La fecha de su cita ha sido modificada correctamente');
      this.router.navigate(['dashboard-paciente/mi-perfil']);
    });
  }

  cancelar() {

    this.auth.usuarioLogg.paciente.citaProx = '';
    this.baseDatos.updateDocumento(this.auth.usuarioLogg.uid, this.auth.usuarioLogg, 'Usuarios').then(corr => {
      let citas = this.doctor.doctor.agendaCitas.filter(cita => cita !== this.cita.id);
      this.doctor.doctor.agendaCitas = citas;

      this.baseDatos.updateDocumento(this.doctor.uid, this.doctor, 'Usuarios').then(bien => {

        this.baseDatos.deleteDocumento(this.cita.id, 'Citas').then(correcto => {
          alert('Su cita ha sido cancelada correctamente');
          this.router.navigate(['dashboard-paciente/mi-perfil']);
        });
      });

    });
  }

}
