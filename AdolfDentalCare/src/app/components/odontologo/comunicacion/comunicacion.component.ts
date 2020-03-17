import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { AutentificacionService } from '../../../services/autentificacion.service';

@Component({
  selector: 'app-comunicacion',
  templateUrl: './comunicacion.component.html',
  styleUrls: ['./comunicacion.component.css']
})
export class ComunicacionComponent implements OnInit {

  pacientes: any[] = [];
  perfilActivo: string;
  paciente: any = null;
  porcentaje = '';
  nPorcentaje: number;

  constructor(private auth: AutentificacionService, private baseDatos: FirestoreService) {
  }

  ngOnInit(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.auth.usuarioLogg.doctor.pacientes.length; index++) {
      this.baseDatos.getDocumento(this.auth.usuarioLogg.doctor.pacientes[index], 'Usuarios').subscribe(user => {
        this.pacientes.push(user.data());
      });
    }

  }

  actualizar() {

  console.log(this.pacientes);

  }

  cambiar() {
  }

}
