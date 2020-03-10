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

    // Crea una promesa para resolver el inicio de sesión
    return new Promise((resolve, reject) => {

      // Llama al método de autentificación de firebase
      this.autentificacion.auth.signInWithEmailAndPassword(email, clave).then( usuario => {

        // Busca el documento en la base de datos
        this.baseDatos.getDocumento(usuario.user.uid, 'Usuarios').subscribe( documento => {

          // Si la data de documento en el atributo tipo es igual a paciente
          if (documento.data().tipo === 'paciente') {

            // Entonces crea la interfaz del usuario con su atributo paciente
            this.usuarioLogg = {
              uid: usuario.user.uid,
              email: usuario.user.email,
              tipo: documento.data().tipo,
              // Como es un paciente se activa el atributo de paciente y se establecen los atributos propios de la interfaz paciente
              paciente: {
                nombre: documento.data().nombre,
                apellido: documento.data().apellido,
                nacimiento: documento.data().nacimiento,
                telefono: documento.data().telefono,
                genero: documento.data().genero,
                direccion: documento.data().direccion,
                antecedentes: documento.data().antecedentes,
                alergias: documento.data().alergias
              }

            };

            // Luego de crear el usuario navega a la vista del dashboard del paciente
            this.router.navigate(['dashboard-paciente/mi-perfil']);

            // En cambio, si el atributo data del documento es igual a doctor
          } else if (documento.data().tipo === 'doctor') {

            // Navega a la ruta del dashboard del administrador
            this.router.navigate(['dashboard-odontólogo/administrar-citas']);

            // En cambio, si el atributo data del documento es igual a admin
          } else {

            // Navega a la ruta del administrador
            this.router.navigate(['dashboard-admin']);
          }
        });

        resolve(usuario);

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
    console.log('Estás cerrando sesión');
    this.router.navigate(['']);
    return this.autentificacion.auth.signOut();
  }


}

