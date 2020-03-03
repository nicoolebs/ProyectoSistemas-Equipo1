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

  usuario: firebase.User;
  public dataUsuario;

  constructor(
    private autentificacion: AutentificacionService,
    private firestore: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.autentificacion.getEstadoUsuario().subscribe( usuario => {
      if (usuario) {
          this.usuario = usuario;
          this.firestore.getDocumento(usuario.uid, 'Usuarios').subscribe( user => {
          this.dataUsuario = user.data();
        });
      }
    });
  }

}
