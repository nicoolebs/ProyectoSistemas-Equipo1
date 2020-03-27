import { firestore } from 'firebase';
import { Usuario } from './../../../models/usuario';
import { AutentificacionService } from './../../../services/autentificacion.service';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confi-banco',
  templateUrl: './confi-banco.component.html',
  styleUrls: ['./confi-banco.component.css']
})
export class ConfiBancoComponent implements OnInit {

  doctor = this.authentication.usuarioLogg;
  nombre = this.doctor.doctor.nombre;
  apellido = this.doctor.doctor.apellido;
  banco: any;
  tipoCta: any;
  nroCta: any;
  identidad: any;

  constructor(
    private firestore : FirestoreService,
    private authentication : AutentificacionService
  ) { }

  ngOnInit(): void {
  }

  guardarCambios(){
    this.authentication.usuarioLogg.doctor.mediosPago.banco.banco = this.banco;
    this.authentication.usuarioLogg.doctor.mediosPago.banco.nombre = this.nombre;
    this.authentication.usuarioLogg.doctor.mediosPago.banco.apellido = this.apellido;
    this.authentication.usuarioLogg.doctor.mediosPago.banco.tipoCta = this.tipoCta;
    this.authentication.usuarioLogg.doctor.mediosPago.banco.nroCuenta = this.nroCta;
    this.authentication.usuarioLogg.doctor.mediosPago.banco.identidad = this.identidad;

    this.firestore.updateDocumento(this.authentication.usuarioLogg.uid,this.authentication.usuarioLogg,'Usuarios');
    alert('Datos guardados con exito.');
  }

}
