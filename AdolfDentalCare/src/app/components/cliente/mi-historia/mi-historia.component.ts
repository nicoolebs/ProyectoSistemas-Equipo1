import { Router } from '@angular/router';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-mi-historia',
  templateUrl: './mi-historia.component.html',
  styleUrls: ['./mi-historia.component.css']
})
export class MiHistoriaComponent implements OnInit {

  usuario: any;
  citas: any[] = [];

  constructor(
    private autentificacion: AutentificacionService,
    private baseDatos: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = this.autentificacion.usuarioLogg;

    for (let index = 0; index < this.autentificacion.usuarioLogg.paciente.historia.length; index++) {

      this.baseDatos.getDocumento(this.autentificacion.usuarioLogg.paciente.historia[index], 'Citas').subscribe(cita => {
        this.citas.push(cita.data());
      });

    }
  }

}
