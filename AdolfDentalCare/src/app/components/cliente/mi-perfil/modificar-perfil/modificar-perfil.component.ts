import { AutentificacionService } from './../../../../services/autentificacion.service';
import { FirestoreService } from './../../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

    usuario;
    nombre;
  constructor(
    private firestore: FirestoreService,
    private authentication : AutentificacionService
  ) { 
    this.usuario = authentication.usuarioLogg;
  }

  
  ngOnInit(): void {
  }
  
    guardarNombre(){
      console.log(this.usuario.uid),
      console.log(this.nombre),
      this.firestore.updateCat(this.usuario.uid,this.nombre,'Usuarios')
    }
}
