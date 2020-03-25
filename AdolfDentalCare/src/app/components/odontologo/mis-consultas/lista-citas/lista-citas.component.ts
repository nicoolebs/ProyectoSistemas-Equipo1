import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../../services/autentificacion.service';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent implements OnInit {

  idCitas: string[] = [];
  agendaCitas: any[] = [];
  citaActiva: boolean[] = [];
  pacientes: any[] = [];
  accion: number[] = [];
  seleccionada: boolean[] = [];

  tratamientoActivo: any;
  recipeActivo: any;
  costoActivo: any;

  constructor(
    private auth: AutentificacionService,
    private baseDatos: FirestoreService
  ) { }

  ngOnInit(): void {

    this.idCitas = this.auth.usuarioLogg.doctor.agendaCitas;

    for (let index = 0; index < this.idCitas.length; index++) {

      this.baseDatos.getDocumento(this.idCitas[index], 'Citas').subscribe( cita => {

        if (cita.data().confirmada) {

          this.agendaCitas.push(cita.data());
          this.citaActiva.push(false);
          this.accion.push(0);
          this.baseDatos.getDocumento(cita.data().paciente, 'Usuarios').subscribe(paciente => {
            this.pacientes.push(paciente.data());
          });

        }
      });
    }

  }

  mostrarCita(i: number) {

    this.citaActiva[i] = !this.citaActiva[i];
  }

  registrar(i) {

    if (this.accion[i] !== 1) {

      this.accion[i] = 1;
    } else {

      this.accion[i] = 0;
    }

  }

  registrarCita(i: number) {

    if (this.tratamientoActivo !== undefined || this.tratamientoActivo !== '' ||
    this.recipeActivo !== undefined || this.recipeActivo !== '' ||
    this.costoActivo !== undefined || this.costoActivo !== '') {

      this.agendaCitas[i].tratamiento = this.agendaCitas[i].tratamiento + ': ' + this.tratamientoActivo;

      this.agendaCitas[i].recipe = this.recipeActivo;

      if (this.costoActivo < 0) {

        this.agendaCitas[i].costo = (-1) * this.costoActivo;
      } else {

        this.agendaCitas[i].costo = this.costoActivo;
      }

      this.baseDatos.updateDocumento(this.agendaCitas[i].id, this.agendaCitas[i], 'Citas').then(corr => {

        this.pacientes[i].paciente.citaProx = '';

        this.pacientes[i].paciente.historia.push(this.agendaCitas[i].id);

        this.baseDatos.updateDocumento(this.pacientes[i].uid, this.pacientes[i], 'Usuarios').then(correcto => {

          let agendada = this.agendaCitas[i].id;

          this.idCitas = this.idCitas.filter(filtro => filtro !== agendada);
          this.agendaCitas = this.agendaCitas.filter(filtro => filtro.id != agendada);

          this.auth.usuarioLogg.doctor.agendaCitas = this.idCitas;

          this.baseDatos.updateDocumento(this.auth.usuarioLogg.uid, this.auth.usuarioLogg, 'Usuarios').then( bien => {

            alert('La cita ha sido registrada correctamente.');

            this.costoActivo = '';
            this.tratamientoActivo = '';
            this.recipeActivo = '';

          }).catch( err => console.log(err));

        }).catch(err => console.log(err));

      }).catch(err => console.log(err));

    } else {

      alert('Por favor, rellene todos los campos.');
    }


  }
}
