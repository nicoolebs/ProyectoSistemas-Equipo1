import { AutentificacionService } from './../../../services/autentificacion.service';
import { Usuario } from './../../../models/usuario';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {
  
  usuariosDelSistema:Usuario[];

  constructor(private fire : FirestoreService, private auth : AutentificacionService) { }

  ngOnInit(): void {

     this.fire.getUsuarios().subscribe(
     usuario => {
       this.usuariosDelSistema = usuario
       });      
  }

  deleteUserOfSistem(usuarioDelSistema){
    this.fire.deleteUser(usuarioDelSistema);
    this.auth.deleteUser(usuarioDelSistema);
  }

}
