import { AutentificacionService } from './../../../services/autentificacion.service';
import { Usuario } from './../../../models/usuario';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';


@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  usuariosDelSistema: any[] = [];

  emailActivo: any;
  accion: number[] = [];

  constructor(private fire: FirestoreService, private auth: AutentificacionService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {

     this.fire.getDocumentos('Usuarios').subscribe(
     usuario => {
       for (let index = 0; index < usuario.length; index++) {
         this.usuariosDelSistema.push(usuario[index].payload.doc.data());
         this.accion.push(0);
       }
       console.log(this.usuariosDelSistema);

       });
  }

  bloquearUsuario(i: number) {
    if (this.accion[i] === 1) {
      this.accion[i] = 0;
    } else {
      this.accion[i] = 1;
    }
  }

  inhabilitarUsuario(i: number) {

  }

  cambiarRol(i: number) {
    if (this.accion[i] === 2) {
      this.accion[i] = 0;
    } else {
      this.accion[i] = 2;
    }
  }

  cambiarClave(i: number) {
    if (this.accion[i] === 3) {
      this.accion[i] = 0;
    } else {
      this.accion[i] = 3;
    }
  }

  resetUserPassword(i: number) {

    this.emailActivo = this.usuariosDelSistema[i].email;

    this.auth.cambiarClave(this.emailActivo);

  }

}
