import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AutentificacionService {

  constructor( private autentificacion: AngularFireAuth) { };

  iniciarSesion(email: string, clave: string) {
    return new Promise((resolve, reject) => {
      this.autentificacion.auth.signInWithEmailAndPassword(email, clave).
      then(userData => resolve(userData), err => reject(err));
    });
  }

  estaLoggeado() {
    return this.autentificacion.authState.pipe(map(auth => auth));
  }

  cerrarSesion() {
  return this.autentificacion.auth.signOut();
  }
}

