import { AutentificacionService } from './../../../../services/autentificacion.service';
import { FirestoreService } from './../../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

    usuario;
    nombre;
    apellido;
    direccion;
    fecha;
    sexo;
    telefono;
  constructor(
    private firestore: FirestoreService,
    private authentication : AutentificacionService
  ) { 
    this.usuario = authentication.usuarioLogg;
  }

  
  ngOnInit(): void {
  }
  
    guardarApellido(){
      this.usuario.paciente.apellido = this.apellido;
      this.firestore.updateCat(this.usuario.uid,this.usuario,'Usuarios')
    }
  
    guardarDireccion(){
      this.usuario.paciente.direccion = this.direccion;
      this.firestore.updateCat(this.usuario.uid,this.usuario,'Usuarios')
    }
    guardarFecha(){
      this.usuario.paciente.nacimiento = this.fecha;
      this.firestore.updateCat(this.usuario.uid,this.usuario,'Usuarios')
    }
    guardarSexo(){
      this.usuario.paciente.genero = this.sexo;
      this.firestore.updateCat(this.usuario.uid,this.usuario,'Usuarios')
    }
    guardarTelefono(){
      this.usuario.paciente.telefono = this.telefono;
      this.firestore.updateCat(this.usuario.uid,this.usuario,'Usuarios')
    }
    guardarNombre(){
      this.usuario.paciente.nombre = this.nombre;
      this.firestore.updateCat(this.usuario.uid,this.usuario,'Usuarios')
    }

}
