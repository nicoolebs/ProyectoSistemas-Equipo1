import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {

  cita = false;
  noTieneCita: boolean;

  constructor(
    private auth: AutentificacionService
  ) { }

  ngOnInit(): void {
    this.noTieneCita = (this.auth.usuarioLogg.paciente.citaProx === '');
    console.log(this.noTieneCita);

  }

  habilitarCita() {
    this.cita = !this.cita;
  }
}
