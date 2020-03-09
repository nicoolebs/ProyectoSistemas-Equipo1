import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Paciente } from '../models/paciente';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})

export class AutentificacionService {

  // Variable para almacenar un registro
  nuevoUsuario: any;

  // Variable para usuario logueado
  usuarioLogg: Usuario;

  // Variable que se activa según el tipo de usuario
  paciente: Paciente;

  constructor(
    private router: Router,
    private autentificacion: AngularFireAuth,
    private baseDatos: FirestoreService) { }

    registrarUser(usuario) {

      this.autentificacion.auth.createUserWithEmailAndPassword(usuario.email, usuario.contrasena)
      .then( credencialUsuario => {
      this.nuevoUsuario = usuario;
      credencialUsuario.user.updateProfile({
        displayName: usuario.nombre,
      }).catch((error) => {
        console.log(error);
      });

    //   this.insertarDatosUsuario(credencialUsuario)
    //   .then(() => {
    //     alert('Usuario Creado Correctamente');
    //     this.router.navigate(['/inicio']);
    //   });
    // }).catch((error) => {
    //   console.log(error);
    });
  }

  // insertarDatosUsuario(credencialUsuario: firebase.auth.UserCredential) {
  //   return this.baseDatos.collection('Usuarios').doc(credencialUsuario.user.uid).set({
  //     email: this.nuevoUsuario.email,
  //     nombre: this.nuevoUsuario.nombre,
  //     apellido: this.nuevoUsuario.apellido,
  //     nacimiento: this.nuevoUsuario.nacimiento,
  //     telefono: this.nuevoUsuario.telefono,
  //     direccion: this.nuevoUsuario.direccion,
  //     antecedentes: this.nuevoUsuario.antecedentes,
  //     alergias: this.nuevoUsuario.alergias,
  //     genero: this.nuevoUsuario.genero,
  //     tipo: this.nuevoUsuario.tipo
  //   });
  // }

  // Método para iniciar sesión
  iniciarSesion(email: string, clave: string) {
    return new Promise((resolve, reject) => {
      this.autentificacion.auth.signInWithEmailAndPassword(email, clave).
      then(userData => {
        this.baseDatos.getDocumento(userData.user.uid, 'Usuarios').subscribe(data => {
          if (data.data().tipo === 'paciente') {
            this.usuarioLogg = {
              uid: userData.user.uid,
              email: userData.user.email,
              tipo: data.data().tipo,
              paciente: {
                nombre: data.data().nombre,
                apellido: data.data().apellido,
                nacimiento: data.data().nacimiento,
                telefono: data.data().telefono,
                genero: data.data().genero,
                direccion: data.data().direccion,
                antecedentes: data.data().antecedentes,
                alergias: data.data().alergias
              }
            };
            this.router.navigate(['dashboard-paciente']);
          } else if(data.data().tipo === 'doctor') {

          }
        });

        resolve(userData);
      }, err => {
        reject(err);
      });
    });
  }

  // Método para establecer el usuario activo
  setUsuario() {
    let usuario = this.autentificacion.auth.currentUser;
  }

  // Método para cerrar sesión
  cerrarSesion() {
  return this.autentificacion.auth.signOut();
  }


}

