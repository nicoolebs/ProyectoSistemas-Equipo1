import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario';
import { FirestoreService } from '../../../../services/firestore.service';
import { AutentificacionService } from '../../../../services/autentificacion.service';
import { Router } from '@angular/router';
import { Cita } from '../../../../models/cita';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  pacienteActivo: string;
  fechaActiva: any;
  horaActiva: string;
  pacientes: any[] = [];
  horario: any[];
  seleccionado = false;
  tratamientoActivo: string;
  paciente: Usuario = null;

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

        if (data.tipo === 'paciente') {

          this.pacientes.push({
            id: lista[index].payload.doc.id,
            data: lista[index].payload.doc.data()
          });

        }
      }

    });
  }

  actualizar() {

      // Filtro en un array el paciente seleccionado
      let pac = this.pacientes.filter(pacientito => pacientito.id === this.pacienteActivo.substring(0, 28));

      // Establesco el paciente elegido
      this.paciente = {
        uid: pac[0].data.uid,
        email: pac[0].data.email,
        tipo: pac[0].data.tipo,
        habilitado: pac[0].data.habilitado,
        paciente: {
          nombre: pac[0].data.paciente.nombre,
          apellido: pac[0].data.paciente.apellido,
          nacimiento: pac[0].data.paciente.nacimiento,
          telefono: pac[0].data.paciente.telefono,
          genero: pac[0].data.paciente.genero,
          direccion: pac[0].data.paciente.direccion,
          antecedentes: pac[0].data.paciente.antecedentes,
          alergias: pac[0].data.paciente.alergias,
          citaProx: pac[0].data.paciente.citaProx,
          historia: pac[0].data.paciente.historia
        }
      };

      if (this.paciente.paciente.citaProx !== '') {
        alert ('El usuario tiene una cita pendiente, no se le puede asignar otra');
      } else {

        // Convierto la fecha seleccionada en un Date
        // tslint:disable-next-line: max-line-length
        this.fechaActiva = new Date(this.fechaActiva.substring(0, 4), this.fechaActiva.substring(5, 7) - 1, this.fechaActiva.substring(8, 10));

        // Busco el horario del doctor ese dia
        this.horario = this.auth.usuarioLogg.doctor.cronograma[this.fechaActiva.getDay()].horas;

        // Filtrar horario para que solo salgan las horas disponibles
        this.horario = this.horario.filter(horaLibre => horaLibre.libre);

        this.seleccionado = true;
      }

    }

    guardarCita() {

      let cita: Cita = {
        doctor: this.auth.usuarioLogg.uid,
        paciente: this.paciente.uid,
        fecha:
        this.fechaActiva.getUTCFullYear().toString() + '-'
        + (this.fechaActiva.getUTCMonth() + 1) + '-' +
        this.fechaActiva.getUTCDate().toString(),
        hora: this.horaActiva,
        tratamiento: this.tratamientoActivo,
        confirmada: true,
        costo: 0,
        recipe: '',
        id: this.paciente.uid +
        this.fechaActiva.getUTCFullYear().toString() + '-'
        + (this.fechaActiva.getUTCMonth() + 1) + '-' + this.fechaActiva.getUTCDate().toString()
        + this.horaActiva,
        paga: false,
        archivo: ''
      };

      this.baseDatos.createDocumento(cita, 'Citas', cita.id).then(info => {

        this.auth.usuarioLogg.doctor.agendaCitas.push(cita.id);

        if (this.auth.usuarioLogg.doctor.pacientes.filter(filtro => filtro === this.paciente.uid).length === 0) {
            this.auth.usuarioLogg.doctor.pacientes.push(this.paciente.uid);
        }

        this.baseDatos.updateDocumento(this.auth.usuarioLogg.uid, this.auth.usuarioLogg, 'Usuarios').then(inf => {

          this.paciente.paciente.citaProx = cita.id;

          this.baseDatos.updateDocumento(this.paciente.uid, this.paciente, 'Usuarios').then(corr => {

            alert('Su cita ha sido agendada con éxito.');

            this.router.navigate(['/dashboard-odontólogo/administrar-citas']);

          }).catch(err => console.log(err));

        }).catch(err => console.log(err));


      }).catch(err => console.log(err));

    }
}
