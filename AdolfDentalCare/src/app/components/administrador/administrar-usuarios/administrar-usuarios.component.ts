import { AutentificacionService } from './../../../services/autentificacion.service';
import { Usuario } from './../../../models/usuario';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { log } from 'util';


@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  usuariosDelSistema: any[] = [];

  tipos: string[] = ['admin', 'doctor', 'paciente'];
  tiposActivos: string[];
  tipoActivo: any;
  seleccionada = 0;

  nuevoUsuario: any;

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
      this.tiposActivos = this.tipos.filter(filtro => filtro !== this.usuariosDelSistema[i].tipo);
    }
  }

  actualizar(i: number) {

    if(this.tipoActivo === 'admin') {

      this.nuevoUsuario = {
        email: this.usuariosDelSistema[i].email,
        habilitado: this.usuariosDelSistema[i].habilitado,
        tipo: 'admin',
        uid: this.usuariosDelSistema[i].uid
      };

      this.fire.deleteDocumento(this.nuevoUsuario.uid, 'Usuarios').then(corr => {

        this.fire.createDocumento(this.nuevoUsuario, 'Usuarios', this.nuevoUsuario.uid).then(bien => {

          alert('El rol del usuario ha sido actualizado correctamente');
          this.router.navigate(['/dashboard-admin']);
        }).catch(err => console.log(err));

      }).catch(err => console.log(err));

    } else if(this.tipoActivo === 'doctor') {

      this.nuevoUsuario = {
        email: this.usuariosDelSistema[i].email,
        habilitado: this.usuariosDelSistema[i].habilitado,
        uid: this.usuariosDelSistema[i].uid,
        tipo: 'doctor',
        doctor: {
          agendaCitas: [],
          apellido: '',
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
          nombre: '',
          pacientes: [],
          porcentaje: 0,
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
        }
      };

      this.seleccionada = 1;

    } else {

      this.nuevoUsuario = {
        email: this.usuariosDelSistema[i].email,
        habilitado: this.usuariosDelSistema[i].habilitado,
        uid: this.usuariosDelSistema[i].uid,
        tipo: 'paciente',
        paciente: {
          alergias: '',
          antecedentes: '',
          apellido: '',
          citaProx: '',
          direccion: '',
          genero: '',
          historia: [],
          nacimiento: '',
          nombre: '',
          telefono: ''
        }
      };

      this.seleccionada = 2;

    }
  }

  guardar() {

    this.fire.deleteDocumento(this.nuevoUsuario.uid, 'Usuarios').then(corr => {

      this.fire.createDocumento(this.nuevoUsuario, 'Usuarios', this.nuevoUsuario.uid).then(bien => {

        alert('El rol del usuario ha sido actualizado correctamente');
        this.router.navigate(['/dashboard-admin']);
      }).catch(err => console.log(err));

    }).catch(err => console.log(err));
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
