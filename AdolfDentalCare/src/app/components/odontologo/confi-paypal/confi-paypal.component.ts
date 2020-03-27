import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { AutentificacionService } from '../../../services/autentificacion.service';

@Component({
  selector: 'app-confi-paypal',
  templateUrl: './confi-paypal.component.html',
  styleUrls: ['./confi-paypal.component.css']
})
export class ConfiPaypalComponent implements OnInit {

  doctor = this.auth.usuarioLogg;
  email: any;

  constructor(
    private firebase : FirestoreService,
    private auth : AutentificacionService
  ) { }

  ngOnInit(): void {
  }

  guardarCambios(){

    this.doctor.doctor.mediosPago.paypal = this.email;

    this.firebase.updateDocumento(this.doctor.uid,this.doctor,'Usuarios').then(corr => {

      alert('Datos guardados con exito');
    });
  }
}
