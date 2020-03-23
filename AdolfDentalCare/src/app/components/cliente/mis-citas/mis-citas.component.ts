import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {

  cita = false;

  constructor() { }

  ngOnInit(): void {
  }

  habilitarCita() {
    this.cita = !this.cita;
  }
}
