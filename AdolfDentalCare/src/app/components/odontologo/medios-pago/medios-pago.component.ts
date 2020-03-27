import { AutentificacionService } from './../../../services/autentificacion.service';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medios-pago',
  templateUrl: './medios-pago.component.html',
  styleUrls: ['./medios-pago.component.css']
})
export class MediosPagoComponent implements OnInit {
  doctor = this.auth.usuarioLogg;
  banco = this.doctor.doctor.mediosPago.banco;
  zelle = this.doctor.doctor.mediosPago.zelle;
  paypal = this.doctor.doctor.mediosPago.paypal;

  constructor(
    private firebase : FirestoreService,
    private auth : AutentificacionService
  ) { }

  ngOnInit(): void {

  }

}
