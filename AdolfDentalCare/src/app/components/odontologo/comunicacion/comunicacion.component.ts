import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { AutentificacionService } from '../../../services/autentificacion.service';

@Component({
  selector: 'app-comunicacion',
  templateUrl: './comunicacion.component.html',
  styleUrls: ['./comunicacion.component.css']
})
export class ComunicacionComponent implements OnInit {

  // Arreglo de pacientes
  pacientes: any[] = [];

  perfilActivo: string;
  mensajeActivo: string;

  tipoDeMensaje = 0;

  paciente: any = null;

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

  cambiarMensaje() {
    console.log(this.perfilActivo);
    console.log(this.mensajeActivo);

    if (this.mensajeActivo == 'Recordatorio de Cita') {
      this.tipoDeMensaje = 1;
    } else if (this.mensajeActivo == 'Recordatorio de Pago Pendiente') {
      this.tipoDeMensaje = 2;
    } else if (this.mensajeActivo == 'Mensaje Personalizado') {
      this.tipoDeMensaje = 3;
    } else {
      this.tipoDeMensaje = 0;
    }

    console.log(this.tipoDeMensaje);

  }

}
