import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  cronograma: any[];

  constructor(
    private auth: AutentificacionService,
    private base: FirestoreService
    ) { }

  ngOnInit(): void {
    this.cronograma = this.auth.usuarioLogg.doctor.cronograma;
    console.log(this.cronograma);

  }

  actualizarCronograma() {
    console.log(this.cronograma);

    this.auth.usuarioLogg.doctor.cronograma = this.cronograma;

    this.base.updateDocumento(this.auth.usuarioLogg.uid, this.auth.usuarioLogg, 'Usuarios');

  }

}
