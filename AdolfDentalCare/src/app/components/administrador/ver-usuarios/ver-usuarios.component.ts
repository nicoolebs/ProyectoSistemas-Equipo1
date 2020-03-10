import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {

  listaUsuarios: any[];

  constructor(private baseDatos: FirestoreService) { }

  ngOnInit(): void {
    this.baseDatos.getDocuementos('Usuarios').subscribe( lista => {
      this.listaUsuarios = lista;
    });
  }

}
