import { AutentificacionService } from './../../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-administrar-historias',
  templateUrl: './administrar-historias.component.html',
  styleUrls: ['./administrar-historias.component.css']
})
export class AdministrarHistoriasComponent implements OnInit {

  creacionPaciente = false;

  constructor(private auth: AutentificacionService) { }

  ngOnInit(): void {
  }

  verForm() {
    this.creacionPaciente = !this.creacionPaciente;

  }
}
