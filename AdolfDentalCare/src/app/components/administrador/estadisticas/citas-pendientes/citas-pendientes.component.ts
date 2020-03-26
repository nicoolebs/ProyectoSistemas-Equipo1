import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-citas-pendientes',
  templateUrl: './citas-pendientes.component.html',
  styleUrls: ['./citas-pendientes.component.css']
})
export class CitasPendientesComponent implements OnInit {

  citasPendientes: any[] = [];

  constructor(private baseDatos: FirestoreService) { }

  ngOnInit(): void {

    this.citasPendientes = [];

    this.baseDatos.getDocumentos('Citas').subscribe(citas => {

      let agendaCitas = []

      for (let index = 0; index < citas.length; index++) {

        agendaCitas.push(citas[index].payload.doc.data());

      }

      for (let index = 0; index < agendaCitas.length; index++) {

        if (agendaCitas[index].costo === 0) {

          this.citasPendientes.push(agendaCitas[index]);
        }

      }
    })
  }

}
