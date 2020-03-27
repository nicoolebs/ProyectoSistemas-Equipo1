import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion-citas',
  templateUrl: './administracion-citas.component.html',
  styleUrls: ['./administracion-citas.component.css']
})
export class AdministracionCitasComponent implements OnInit {

  idCitas: string[] = [];
  agendaCitas: any[] = [];
  citaActiva: boolean[] = [];
  pacientes: any[] = [];
  accion: number[] = [];
  seleccionada: boolean[] = [];

  fechaActiva: any;
  horaActiva: any;
  horario: any;

  constructor(
    private auth: AutentificacionService,
    private baseDatos: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.idCitas = this.auth.usuarioLogg.doctor.agendaCitas;

    for (let index = 0; index < this.idCitas.length; index++) {

      this.baseDatos.getDocumento(this.idCitas[index], 'Citas').subscribe( cita => {

        this.agendaCitas.push(cita.data());
        this.citaActiva.push(false);
        this.accion.push(0);
        this.seleccionada.push(false);
        this.baseDatos.getDocumento(cita.data().paciente, 'Usuarios').subscribe(paciente => {
          this.pacientes.push(paciente.data());
        });
      });
    }

    console.log(this.pacientes);


  }

  mostrarCita(i: number) {

    this.citaActiva[i] = !this.citaActiva[i];
  }

  cambiarFecha(i: number) {

    if (this.accion[i] !== 1) {

      this.accion[i] = 1;
    } else {

      this.accion[i] = 0;
    }

  }

  cancelarCita(i: number) {

    if (this.accion[i] !== 2) {

      this.accion[i] = 2;
    } else {

      this.accion[i] = 0;
    }

  }

  confirmarCita(i: number) {

    if (this.accion[i] !== 3) {

      this.accion[i] = 3;
    } else {

      this.accion[i] = 0;
    }

  }

  verHorario(i: number) {

    this.fechaActiva = new Date(this.fechaActiva.substring(0, 4), this.fechaActiva.substring(5, 7) - 1, this.fechaActiva.substring(8, 10));

    // Busco el horario del doctor ese dia
    this.horario = this.auth.usuarioLogg.doctor.cronograma[this.fechaActiva.getDay()].horas;

    // Filtrar horario para que solo salgan las horas disponibles
    this.horario = this.horario.filter(horaLibre => horaLibre.libre);

    this.seleccionada[i] = true;
  }

  cambiar(i: number) {

    this.agendaCitas[i].fecha =
    this.fechaActiva.getUTCFullYear().toString() + '-'
    + (this.fechaActiva.getUTCMonth() + 1) + '-' +
    this.fechaActiva.getUTCDate().toString();

    this.agendaCitas[i].hora = this.horaActiva;

    this.baseDatos.updateDocumento(this.agendaCitas[i].id, this.agendaCitas[i], 'Citas').then(corr => {
      alert('La fecha de su cita ha sido modificada correctamente');
      this.router.navigate(['dashboard-odontólogo/mis-pacientes']);
    });

  }

  cancelar(i) {

    let cancelada: string = this.agendaCitas[i].id;

    this.baseDatos.getDocumento(cancelada, 'Citas').subscribe(citaCancelada => {
      let cita = citaCancelada.data();

      this.agendaCitas = this.agendaCitas.filter(filtro => filtro.id !== cancelada);
      this.idCitas = this.idCitas.filter(filtro => filtro !== cancelada);

      this.auth.usuarioLogg.doctor.agendaCitas = this.idCitas;

      console.log(this.auth.usuarioLogg);

      this.baseDatos.updateDocumento(this.auth.usuarioLogg.uid, this.auth.usuarioLogg, 'Usuarios').then(corr => {

        this.baseDatos.getDocumento(cita.paciente, 'Usuarios').subscribe(paciente => {

          let pacientito = paciente.data();
          pacientito.paciente.citaProx = '';

          this.baseDatos.updateDocumento(pacientito.uid, pacientito, 'Usuarios').then(bien => {

            this.baseDatos.deleteDocumento(cita.id, 'Citas').then(correcto => {
              alert('Su cita ha sido cancelada correctamente');
            });
          });

        });

        });

    });
  }

  confirmar(i: number) {

    this.agendaCitas[i].confirmada = true;

    this.baseDatos.updateDocumento(this.agendaCitas[i].id, this.agendaCitas[i], 'Citas').then(confir => {
      alert('La cita ha sido confirmada con éxito');
    });
  }

}
