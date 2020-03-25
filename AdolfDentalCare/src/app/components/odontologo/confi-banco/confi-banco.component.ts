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
  banco = '';
  tipoCta = '';
  nroCta = '';
  identidad = '';
  
  constructor(
    private firestore : FirestoreService,
    private authentication : AutentificacionService
  ) { }

  ngOnInit(): void {
  }

}
