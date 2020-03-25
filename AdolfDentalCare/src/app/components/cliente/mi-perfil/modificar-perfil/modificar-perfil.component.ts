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
      this.authentication.usuarioLogg.paciente.apellido = this.apellido;
      this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
    }

    guardarDireccion() {
      this.authentication.usuarioLogg.paciente.direccion = this.direccion;
      this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
    }

    guardarFecha() {
      this.authentication.usuarioLogg.paciente.nacimiento = this.fecha;
      this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
    }

    guardarSexo() {
      this.authentication.usuarioLogg.paciente.genero = this.sexo;
      this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
    }

    guardarTelefono() {
      this.authentication.usuarioLogg.paciente.telefono = this.telefono;
      this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
    }

    guardarNombre() {
      this.authentication.usuarioLogg.paciente.nombre = this.nombre;
      this.firestore.updateDocumento(this.authentication.usuarioLogg.uid, this.authentication.usuarioLogg, 'Usuarios');
    }

}
