import { Router } from '@angular/router';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../services/autentificacion.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-mi-historia',
  templateUrl: './mi-historia.component.html',
  styleUrls: ['./mi-historia.component.css']
})
export class MiHistoriaComponent implements OnInit {

  usuario: firebase.User;

  constructor(
    private autentificacion: AutentificacionService,
    private baseDatos: AngularFirestore,
    private firestore: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.autentificacion.getEstadoUsuario()
    .subscribe( usuario => {
      if(usuario){
        this.usuario = usuario;
      }
    });
  }

}
