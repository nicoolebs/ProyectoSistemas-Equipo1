import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  doctorActivo: string;
  fechaActiva: Date;
  doctores: any[] = [];

  constructor(private baseDatos: FirestoreService) { }

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

    console.log(this.doctorActivo);
    console.log(this.fechaActiva);


  }

}
