import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  cronograma: any[];

  constructor(private auth: AutentificacionService) { }

  ngOnInit(): void {
    this.cronograma = this.auth.usuarioLogg.doctor.cronograma;
    console.log(this.cronograma);

  }

  actualizarCronograma() {
    console.log(this.cronograma);

  }

}
