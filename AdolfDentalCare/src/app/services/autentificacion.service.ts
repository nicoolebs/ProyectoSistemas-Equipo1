import { Mensaje } from './../models/mensaje';
import { Usuario } from './../models/usuario';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private baseDatos: FirestoreService,
    private fire: AngularFirestore) { }

    current() {
       return this.autentificacion.auth.currentUser;
    }

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
            habilitado: true,
            paciente: {
              nombre: usuario.nombre,
              apellido: usuario.apellido,
              nacimiento: usuario.nacimiento,
              telefono: usuario.telefono,
              genero: usuario.genero,
              direccion: usuario.direccion,
              antecedentes: usuario.antecedentes,
              alergias: usuario.alergias,
              citaProx: '',
              historia: [],
            }
          };

          // Log de proceso exitoso
          console.log('Usuario creado exitosamente');

        } else if (tipo === 'doctor') {

          // Establece que el nuevo usuario es un doctor y guarda sus datos
          this.nuevoUsuario = {
            uid: credencialUsuario.user.uid,
            email: credencialUsuario.user.email,
            tipo: 'doctor',
            habilitado: true,
            doctor: {
              nombre: usuario.nombre,
              apellido: usuario.apellido,
              pacientes: [],
              cronograma: [
                {dia: 0, horas: [
                  {hora: '10:00', libre: true},
                  {hora: '11:00', libre: true},
                  {hora: '12:00', libre: true},
                  {hora: '13:00', libre: true},
                  {hora: '14:00', libre: true},
                  {hora: '15:00', libre: true},
                ]},
                {dia: 1, horas: [
                  {hora: '10:00', libre: true},
                  {hora: '11:00', libre: true},
                  {hora: '12:00', libre: true},
                  {hora: '13:00', libre: true},
                  {hora: '14:00', libre: true},
                  {hora: '15:00', libre: true},
                ]},
                {dia: 2, horas: [
                  {hora: '10:00', libre: true},
                  {hora: '11:00', libre: true},
                  {hora: '12:00', libre: true},
                  {hora: '13:00', libre: true},
                  {hora: '14:00', libre: true},
                  {hora: '15:00', libre: true},
                ]},
                {dia: 3, horas: [
                  {hora: '10:00', libre: true},
                  {hora: '11:00', libre: true},
                  {hora: '12:00', libre: true},
                  {hora: '13:00', libre: true},
                  {hora: '14:00', libre: true},
                  {hora: '15:00', libre: true},
                ]},
                {dia: 4, horas: [
                  {hora: '10:00', libre: true},
                  {hora: '11:00', libre: true},
                  {hora: '12:00', libre: true},
                  {hora: '13:00', libre: true},
                  {hora: '14:00', libre: true},
                  {hora: '15:00', libre: true},
                ]},
                {dia: 5, horas: [
                  {hora: '10:00', libre: true},
                  {hora: '11:00', libre: true},
                  {hora: '12:00', libre: true},
                  {hora: '13:00', libre: true},
                  {hora: '14:00', libre: true},
                  {hora: '15:00', libre: true},
                ]},
                {dia: 6, horas: [
                  {hora: '10:00', libre: true},
                  {hora: '11:00', libre: true},
                  {hora: '12:00', libre: true},
                  {hora: '13:00', libre: true},
                  {hora: '14:00', libre: true},
                  {hora: '15:00', libre: true},
                ]}
              ],
              mediosPago: {
                paypal: '',
                zelle: {
                  nombre: '',
                  email: '',
                },
                banco: {
                  nombre: '',
                  apellido: '',
                  nroCuenta: '',
                  tipoCta: '',
                  identidad: '',
                  banco: ''
                }
              },
              porcentaje: 0,
              agendaCitas: [],
            }
          };
        }

        // Se crea el documento en la base de datos con la información del perfil del usuario
        this.baseDatos.createDocumento(this.nuevoUsuario, 'Usuarios', this.nuevoUsuario.uid).then( res => {
          console.log('Documento creado exitosamente');
        });

        this.router.navigate(['']);

        // Si existe algún error entonces muestra en consola el error
      }).catch((error) => {
        alert(error);
      });
  }

  crearPaciente(usuario) {

    this.autentificacion.auth.createUserWithEmailAndPassword(usuario.email, usuario.contrasena).then( credencialUsuario => {

      // Establece que el nuevo usuario es un paciente y guarda sus datos
      this.nuevoUsuario = {
        uid: credencialUsuario.user.uid,
        email: credencialUsuario.user.email,
        tipo: 'paciente',
        habilitado: false,
        paciente: {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          nacimiento: usuario.nacimiento,
          telefono: usuario.telefono,
          genero: usuario.genero,
          direccion: usuario.direccion,
          antecedentes: usuario.antecedentes,
          alergias: usuario.alergias,
          citaProx: '',
          historia: []
        }
      };

      // Se crea el documento en la base de datos con la información del perfil del usuario
      this.baseDatos.createDocumento(this.nuevoUsuario, 'Usuarios', this.nuevoUsuario.uid).then( res => {
        console.log('Documento creado exitosamente');
      });

      this.guardarPacienteEnDoctor(credencialUsuario.user.uid);

      let mensaje: Mensaje = {
        email: this.nuevoUsuario.email,
        asunto: 'Bienvenido a Adolf Dental Care',
        texto: 'Sea bienvenido a la página de Adolf Dental Care <br>Su usuario es: '
        + this.nuevoUsuario.email
        +'<br>Por favor, antes de iniciar sesión cambie su clave.'
      };

      this.baseDatos.createDocumento(mensaje, 'Correos', this.nuevoUsuario.uid).then(() => {
        console.log('Documento mensaje creado en Correos');
      });
    }).catch(err => {
      alert(err);
    });
  }

  guardarPacienteEnDoctor(uidP: string) {
    console.log('Probando guardar');
    console.log(uidP);

    this.usuarioLogg.doctor.pacientes.push(uidP);
    console.log(this.usuarioLogg);

    this.baseDatos.updateDocumento(this.usuarioLogg.uid, this.usuarioLogg, 'Usuarios');
  }

  // Método para iniciar sesión
  iniciarSesion(email: string, clave: string) {

    // Crea una promesa para resolver el inicio de sesión
    return new Promise((resolve, reject) => {

      // Llama al método de autentificación de firebase
      this.autentificacion.auth.signInWithEmailAndPassword(email, clave).then( usuario => {

        // Busca el documento en la base de datos
        this.baseDatos.getDocumento(usuario.user.uid, 'Usuarios').subscribe( documento => {

          if (documento.data().habilitado === false){
            alert ('Estimado usuario, su cuenta se encuentra bloqueada. Proceda a comunicarse con un administrador para desbloquearla.');
            this.cerrarSesion();
          } else {

            // Si la data de documento en el atributo tipo es igual a paciente
            if (documento.data().tipo === 'paciente') {

              // Entonces crea la interfaz del usuario con su atributo paciente
              this.usuarioLogg = {
                uid: usuario.user.uid,
                email: usuario.user.email,
                tipo: documento.data().tipo,
                habilitado: documento.data().habilitado,
                // Como es un paciente se activa el atributo de paciente y se establecen los atributos propios de la interfaz paciente
                paciente: {
                  nombre: documento.data().paciente.nombre,
                  apellido: documento.data().paciente.apellido,
                  nacimiento: documento.data().paciente.nacimiento,
                  telefono: documento.data().paciente.telefono,
                  genero: documento.data().paciente.genero,
                  direccion: documento.data().paciente.direccion,
                  antecedentes: documento.data().paciente.antecedentes,
                  alergias: documento.data().paciente.alergias,
                  citaProx: documento.data().paciente.citaProx,
                  historia: documento.data().paciente.historia
                }

              };

              // Luego de crear el usuario navega a la vista del dashboard del paciente
              this.router.navigate(['dashboard-paciente/mi-perfil']);

              // En cambio, si el atributo data del documento es igual a doctor
            } else if (documento.data().tipo === 'doctor') {

              this.usuarioLogg = {
                uid: usuario.user.uid,
                email: usuario.user.email,
                tipo: documento.data().tipo,
                habilitado: documento.data().habilitado,
                // Como es un doctor se activa el atributo de doctor y se establecen los atributos propios de la interfaz paciente
                doctor: {
                  nombre: documento.data().doctor.nombre,
                  apellido: documento.data().doctor.apellido,
                  pacientes: documento.data().doctor.pacientes,
                  cronograma: documento.data().doctor.cronograma,
                  mediosPago: documento.data().doctor.mediosPago,
                  porcentaje: documento.data().doctor.porcentaje,
                  agendaCitas: documento.data().doctor.agendaCitas
                }
              };

              // Navega a la ruta del dashboard del odontólogo
              this.router.navigate(['dashboard-odontólogo/administrar-citas']);

              // En cambio, si el atributo data del documento es igual a admin
            } else {

              this.usuarioLogg = {
                uid: documento.data().uid,
                email: documento.data().email,
                tipo: documento.data().tipo,
                habilitado: documento.data().habilitado
              }

              // Navega a la ruta del administrador
              this.router.navigate(['dashboard-admin']);
            }
          }

        });


        // Si ocurre algun error, lo muestra en consola
      }, err => {
        alert(err);
      });
    });
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

  cambiarClave(email: string) {

    if (email !== '' || email !== undefined) {

      this.autentificacion.auth.sendPasswordResetEmail(email).then(corr => {
        alert('Un correo electrónico ha sido enviado para proceder a la modificación de la contraseña.');
      }).catch(err => {
        alert(err);
      });

    } else {

      alert('Por favor, rellene el campo del email.');

    }

  }



}

