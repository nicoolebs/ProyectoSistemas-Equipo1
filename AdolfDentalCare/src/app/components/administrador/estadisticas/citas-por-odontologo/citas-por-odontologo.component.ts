import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-citas-por-odontologo',
  templateUrl: './citas-por-odontologo.component.html',
  styleUrls: ['./citas-por-odontologo.component.css']
})
export class CitasPorOdontologoComponent implements OnInit {

  odontologos: any[] = [];
  cantidadCitas: number[] = [];

  constructor(private baseDatos: FirestoreService) { }

  ngOnInit(): void {

    this.baseDatos.getDocumentos('Usuarios').subscribe(doctor => {

      this.odontologos = [];

      for (let index = 0; index < doctor.length; index++) {

        this.odontologos.push(doctor[index].payload.doc.data());

      }

      this.odontologos = this.odontologos.filter(filtro => filtro.tipo === 'doctor');

      this.baseDatos.getDocumentos('Citas').subscribe(citas => {

        let cita = [];

        for (let index = 0; index < citas.length; index++) {

          cita.push(citas[index].payload.doc.data());
        }

        for (let index = 0; index < this.odontologos.length; index++) {

          this.cantidadCitas.push(0);

          for (let i = 0; i < cita.length; i++) {

            if (cita[i].doctor === this.odontologos[index].uid) {

              this.cantidadCitas[index] = this.cantidadCitas[index] + 1;

            }

          }
        }

      });

    });

  }

}
