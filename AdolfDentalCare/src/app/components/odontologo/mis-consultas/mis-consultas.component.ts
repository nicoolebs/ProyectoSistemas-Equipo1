import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-consultas',
  templateUrl: './mis-consultas.component.html',
  styleUrls: ['./mis-consultas.component.css']
})
export class MisConsultasComponent implements OnInit {

  citaActiva = false;

  constructor() { }

  ngOnInit(): void {
  }

  crearCita() {
    this.citaActiva = !this.citaActiva;
  }

}
