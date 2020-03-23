import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  doctorActivo: string;
  doctores: any[];

  constructor() { }

  ngOnInit(): void {
  }

  actualizar() {

  }

}
