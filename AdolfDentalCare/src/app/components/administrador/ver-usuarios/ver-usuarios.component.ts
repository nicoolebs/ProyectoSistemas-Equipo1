import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {

  listaUsuarios: any[] = [];
  perfilActivo: boolean[] = [];

  constructor(private baseDatos: FirestoreService) { }

  ngOnInit(): void {
    this.baseDatos.getDocumentos('Usuarios').subscribe( lista => {

      for (let index = 0; index < lista.length; index++) {

        this.listaUsuarios.push({
          id: lista[index].payload.doc.id,
          data: lista[index].payload.doc.data()
        });
        this.perfilActivo[index] = false;
      }
    });
  }

  mostrarPerfil(index) {
    this.perfilActivo[index] = !this.perfilActivo[index];

  }

}
