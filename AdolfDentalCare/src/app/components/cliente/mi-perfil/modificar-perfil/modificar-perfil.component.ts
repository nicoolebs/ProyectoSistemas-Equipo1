import { AutentificacionService } from './../../../../services/autentificacion.service';
import { FirestoreService } from './../../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

    nombre;
    apellido;
    direccion;
    fecha;
    sexo;
    telefono;

  constructor(
    private firestore: FirestoreService,
    private authentication: AutentificacionService
  ) {}


  ngOnInit(): void {
  }

    guardarApellido() {

      if (this.apellido === undefined || this.apellido === '') {

        alert('ERROR, no puede dejar el campo vacío.');

      } else {

        this.authentication.usuarioLogg.paciente.apellido = this.apellido;
        this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');

      }

    }

    guardarDireccion() {

      if (this.direccion === undefined || this.direccion === '') {

        alert('ERROR, no puede dejar el campo vacío.');

      } else {

        this.authentication.usuarioLogg.paciente.direccion = this.direccion;
        this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');

      }
    }

    guardarFecha() {

      if (this.fecha === undefined || this.fecha === '') {

        alert('ERROR, no puede dejar el campo vacío.');

      } else {

        this.authentication.usuarioLogg.paciente.nacimiento = this.fecha;
        this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
      }
    }

    guardarSexo() {
      if (this.sexo === undefined || this.sexo === '') {

        alert('ERROR, no puede dejar el campo vacío.');

      } else {

        this.authentication.usuarioLogg.paciente.genero = this.sexo;
        this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
      }
    }

    guardarTelefono() {
      if (this.telefono === undefined || this.telefono === '') {

        alert('ERROR, no puede dejar el campo vacío.');

      } else {

        this.authentication.usuarioLogg.paciente.telefono = this.telefono;
        this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
      }
    }

    guardarNombre() {
      if (this.nombre === undefined || this.nombre === '') {

        alert('ERROR, no puede dejar el campo vacío.');

      } else {

        this.authentication.usuarioLogg.paciente.nombre = this.nombre;
        this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
      }
    }

}
