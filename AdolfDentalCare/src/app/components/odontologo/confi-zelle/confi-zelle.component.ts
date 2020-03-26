import { AutentificacionService } from './../../../services/autentificacion.service';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confi-zelle',
  templateUrl: './confi-zelle.component.html',
  styleUrls: ['./confi-zelle.component.css']
})
export class ConfiZelleComponent implements OnInit {
  
  doctor = this.auth.usuarioLogg;
  email = '';
  nombre = this.doctor.doctor.nombre;

  constructor(
    private firebase : FirestoreService,
    private auth : AutentificacionService
  ) { }

  ngOnInit(): void {
  }

  guardarCambios(){
    this.doctor.doctor.mediosPago.zelle.nombre = this.nombre;
    this.doctor.doctor.mediosPago.zelle.email = this.email;
    
    this.firebase.updateDocumento(this.doctor.uid,this.doctor,'Usuarios');
    alert('Datos guardados con exito');
  }

}
