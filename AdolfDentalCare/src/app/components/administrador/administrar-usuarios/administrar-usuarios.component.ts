import { AutentificacionService } from './../../../services/autentificacion.service';
import { Usuario } from './../../../models/usuario';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  usuariosDelSistema: any[] = [];

  emailActivo: any;
  accion: number[] = [];

  constructor(private fire: FirestoreService, private auth: AutentificacionService, private router: Router) { }

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

    this.usuariosDelSistema[i].habilitado = !this.usuariosDelSistema[i].habilitado;

    this.fire.updateDocumento(this.usuariosDelSistema[i].uid, this.usuariosDelSistema[i], 'Usuarios').then(corr => {
      alert('Usuario bloqueado/desbloqueado correctamente.');
      this.router.navigate(['/dashboard-admin']);
    }).catch(err => {
      console.log(err);
    });
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
