import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../models/usuario';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})

export class AutentificacionService {

  // Variable para almacenar un registro
  nuevoUsuario: Usuario;

  // Variable para usuario logueado
  usuarioLogg: Usuario;

  constructor(
    private router: Router,
    private autentificacion: AngularFireAuth,
    private baseDatos: FirestoreService) { }

    // Método para registrar un usuario nuevo
    registrarUser(usuario, tipo) {

      // Método de firebase autentificación que crea un nuevo usuario
      this.autentificacion.auth.createUserWithEmailAndPassword(usuario.email, usuario.contrasena).then( credencialUsuario => {

        // Si el tipo de usuario que se registra es paciente
        if (tipo === 'paciente') {

          // Establece que el nuevo usuario es un paciente y guarda sus datos
          this.nuevoUsuario = {
            uid: credencialUsuario.user.uid,
            email: credencialUsuario.user.email,
            tipo: 'paciente',
            paciente: {
              nombre: usuario.nombre,
              apellido: usuario.apellido,
              nacimiento: usuario.nacimiento,
              telefono: usuario.telefono,
              genero: usuario.genero,
              direccion: usuario.direccion,
              antecedentes: usuario.antecedentes,
              alergias: usuario.alergias
            }
          };

          // Log de proceso exitoso
          console.log('Usuario creado exitosamente');

        }

        // Se crea el documento en la base de datos con la información del perfil del usuario
        this.baseDatos.createDocumento(this.nuevoUsuario, 'Usuarios', this.nuevoUsuario.uid).then( res => {
          console.log('Documento creado exitosamente');
        });

        this.router.navigate(['']);

        // Si existe algún error entonces muestra en consola el error
      }).catch((error) => {
        console.log(error);
      });
  }

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

        // Si ocurre algun error, lo muestra en consola
      }, err => {
        console.log(err);
      });
    });
  }

  // Método para establecer el usuario activo
  setUsuario() {
    let usuario = this.autentificacion.auth.currentUser;
  }

  // Método para cerrar sesión
  cerrarSesion() {

    // Log de información
    console.log('Estás cerrando sesión');

    // Redireccionamiento
    this.router.navigate(['']);

    // Llamada a metodo de cerrar sesión de firebase
    return this.autentificacion.auth.signOut();
  }


}

