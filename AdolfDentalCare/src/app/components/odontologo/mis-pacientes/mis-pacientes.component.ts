import { AutentificacionService } from './../../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.css']
})
export class MisPacientesComponent implements OnInit {

  pacientes: any;
  pacientesDoc: any[] = [];
  perfilActivo: boolean[] = [];

  constructor(private auth: AutentificacionService, private baseDatos: FirestoreService) { }

  ngOnInit(): void {
    this.pacientes = this.auth.usuarioLogg.doctor.pacientes;

    for (let index = 0; index < this.pacientes.length; index++) {
      this.baseDatos.getDocumento(this.pacientes[index], 'Usuarios').subscribe(user => {
        this.pacientesDoc.push({
          id: user.id,
          data: user.data()
        });
        this.perfilActivo[index] = false;
      });

    }
    console.log(this.pacientesDoc);
    console.log(this.perfilActivo);
  }

    mostrarPerfil(index) {
    this.perfilActivo[index] = !this.perfilActivo[index];
  }

}
