import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutentificacionService {

  nuevoUsuario: any;
  private eventError = new BehaviorSubject<string>("");
  eventError$ = this.eventError.asObservable();

  constructor(
    private router: Router,
    private autentificacion: AngularFireAuth,
    private baseDatos: AngularFirestore) { }

  registrarUser(usuario) {

    this.autentificacion.auth.createUserWithEmailAndPassword(usuario.email, usuario.contrasena)
    .then( credencialUsuario => {
      this.nuevoUsuario = usuario;
      credencialUsuario.user.updateProfile({
        displayName: usuario.nombre,
      }).catch((error) => {
        console.log(error);
        this.eventError.next(error);
      });

      this.insertarDatosUsuario(credencialUsuario)
      .then(() => {
        alert('Usuario Creado Correctamente');
        this.router.navigate(['/inicio']);
      });
    }).catch((error) => {
      console.log(error);
      this.eventError.next(error);
    });
  }

  insertarDatosUsuario(credencialUsuario: firebase.auth.UserCredential) {
    return this.baseDatos.collection('Usuarios').doc(credencialUsuario.user.uid).set({
      email: this.nuevoUsuario.email,
      nombre: this.nuevoUsuario.nombre,
      apellido: this.nuevoUsuario.apellido,
      nacimiento: this.nuevoUsuario.nacimiento,
      telefono: this.nuevoUsuario.telefono,
      direccion: this.nuevoUsuario.direccion,
      antecedentes: this.nuevoUsuario.antecedentes,
      alergias: this.nuevoUsuario.alergias,
      genero: this.nuevoUsuario.genero
      // rol: this.nuevoUsuario.tipoUsuario
    });
  }

  iniciarSesion(email: string, clave: string) {
    return new Promise((resolve, reject) => {
      this.autentificacion.auth.signInWithEmailAndPassword(email, clave).
      then(userData => resolve(userData), err => reject(err));
    });
  }

  getEstadoUsuario() {
    return this.autentificacion.authState;
  }

  // AGREGAR ESTO CUANDO ESTÉ LISTO EL NAVBAR DEL DASHBOARD
  estaLoggeado() {
    this.autentificacion.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
       console.log('logged in');
      } else {
       console.log('not logged in');
      }
    });
  }

  cerrarSesion() {
  return this.autentificacion.auth.signOut();
  }
}

