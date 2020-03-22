import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { database } from 'firebase';
import { Usuario } from '../../../models/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-porcentajes',
  templateUrl: './porcentajes.component.html',
  styleUrls: ['./porcentajes.component.css']
})
export class PorcentajesComponent implements OnInit {

  doctores: any[] = [];
  perfilActivo: string;
  doctorcito: any = null;
  porcentaje = '';
  nPorcentaje: number;

  constructor(private baseDatos: FirestoreService) {
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

    this.doctorcito = this.doctores.filter(condicion =>
      condicion.id === this.perfilActivo.substring(0,28));

    console.log(this.doctorcito);



  }

  cambiar() {
    this.doctorcito[0].data.doctor.porcentaje = this.nPorcentaje;
    this.baseDatos.updateDocumento(this.doctorcito[0].id, this.doctorcito[0].data, 'Usuarios');
  }

}
