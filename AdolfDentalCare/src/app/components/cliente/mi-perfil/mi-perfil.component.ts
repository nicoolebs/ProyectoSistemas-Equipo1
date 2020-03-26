import { FirestoreService } from './../../../services/firestore.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  usuarioActivo;
  modificar = false;

  constructor(
    private autentificacion: AutentificacionService,
    private firestore: FirestoreService,
    private router: Router
  ) {
    this.usuarioActivo = autentificacion.usuarioLogg;

  }

  ngOnInit(): void {
  }

  modificarPerfil(){
    this.modificar = !this.modificar;

  }
}
