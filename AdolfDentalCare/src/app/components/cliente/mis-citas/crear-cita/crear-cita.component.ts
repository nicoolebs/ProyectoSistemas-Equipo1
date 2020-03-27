import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';
import { Cita } from '../../../../models/cita';
import { AutentificacionService } from '../../../../services/autentificacion.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  doctorActivo: string;
  fechaActiva: any;
  horaActiva: string;
  doctores: any[] = [];
  horario: any[];
  seleccionado = false;
  tratamientoActivo: string;
  doctor: Usuario = null;

  tratamientos = ['Odontólogia General', 'Cirugía Dental', 'Ortodoncia', 'Blanqueamiento Dental', 'Implantes Dentales', 'Periodoncia'];

  constructor(
    private baseDatos: FirestoreService,
    private auth: AutentificacionService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.baseDatos.getDocumentos('Usuarios').subscribe( lista => {

      for (let index = 0; index < lista.length; index++) {

        let data: any = lista[index].payload.doc.data();

        if (data.tipo === 'doctor') {

          this.doctores.push({
            id: lista[index].payload.doc.id,
            data: lista[index].payload.doc.data()
          });

        }
      }

    });
  }

  actualizar() {

      // Filtro en un array el doctor seleccionado
      let doc = this.doctores.filter(doctorcito => doctorcito.id === this.doctorActivo.substring(0, 28));

      // Establesco el doctor elegido
      this.doctor = {
        uid: doc[0].data.uid,
        email: doc[0].data.email,
        tipo: doc[0].data.tipo,
        habilitado: doc[0].data.habilitado,
        doctor: {
          nombre: doc[0].data.doctor.nombre,
          apellido: doc[0].data.doctor.apellido,
          pacientes: doc[0].data.doctor.pacientes,
          cronograma: doc[0].data.doctor.cronograma,
          mediosPago: doc[0].data.doctor.mediosPago,
          porcentaje: doc[0].data.doctor.porcentaje,
          agendaCitas: doc[0].data.doctor.agendaCitas
        }
      }

      // Convierto la fecha seleccionada en un Date
      // tslint:disable-next-line: max-line-length
      this.fechaActiva = new Date(this.fechaActiva.substring(0, 4), this.fechaActiva.substring(5, 7) - 1, this.fechaActiva.substring(8, 10));

      // Busco el horario del doctor ese dia
      this.horario = this.doctor.doctor.cronograma[this.fechaActiva.getDay()].horas;

      // Filtrar horario para que solo salgan las horas disponibles
      this.horario = this.horario.filter(horaLibre => horaLibre.libre);

      this.seleccionado = true;
    }

    guardarCita() {

      let cita: Cita = {
        doctor: this.doctor.uid,
        paciente: this.auth.usuarioLogg.uid,
        fecha:
        this.fechaActiva.getUTCFullYear().toString() + '-'
        + (this.fechaActiva.getUTCMonth() + 1) + '-' +
        this.fechaActiva.getUTCDate().toString(),
        hora: this.horaActiva,
        tratamiento: this.tratamientoActivo,
        confirmada: false,
        costo: 0,
        recipe: '',
        id: this.auth.usuarioLogg.uid +
        this.fechaActiva.getUTCFullYear().toString() + '-'
        + (this.fechaActiva.getUTCMonth() + 1) + '-' + this.fechaActiva.getUTCDate().toString()
        + this.horaActiva,
        paga: false,
        archivo: ''
      };

      this.baseDatos.createDocumento(cita, 'Citas', cita.id).then(info => {

        this.auth.usuarioLogg.paciente.citaProx = cita.id;
        this.baseDatos.updateDocumento(this.auth.usuarioLogg.uid, this.auth.usuarioLogg, 'Usuarios').then(inf => {

          this.doctor.doctor.agendaCitas.push(cita.id);

          let pacientes = this.doctor.doctor.pacientes.filter(paciente => paciente === this.auth.usuarioLogg.uid);
          console.log(pacientes);

          if (pacientes.length === 0) {
            this.doctor.doctor.pacientes.push(this.auth.usuarioLogg.uid);
          }

          this.baseDatos.updateDocumento(this.doctor.uid, this.doctor, 'Usuarios').then(corr => {

            alert('Su cita ha sido agendada con éxito.');

            this.router.navigate(['dashboard-paciente/mi-perfil']);

          }).catch(err => console.log(err));

        }).catch(err => console.log(err));


      }).catch(err => console.log(err));

    }
}

