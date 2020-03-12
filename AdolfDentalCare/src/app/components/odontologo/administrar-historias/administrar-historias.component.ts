import { AutentificacionService } from './../../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-administrar-historias',
  templateUrl: './administrar-historias.component.html',
  styleUrls: ['./administrar-historias.component.css']
})
export class AdministrarHistoriasComponent implements OnInit {

  crear: boolean;

  registro: any;
  verificacion: any;

  constructor(private auth: AutentificacionService) { }

  ngOnInit(): void {
    this.crear = false;
    this.registro = {
      email: '',
      contrasena: 'CoNtRaSeÑaRaNdOm',
      nombre: '',
      apellido: '',
      nacimiento: '',
      telefono: '',
      direccion: '',
      antecedentes: '',
      alergias: '',
      genero: '',
      tipo: 'paciente'
    };
    this.verificacion = {
      email: '',
      contrasena: ''
    };
  }

  verForm() {
    this.crear = !this.crear;
  }

  crearPaciente() {

    console.log(this.registro);

    this.auth.crearPaciente(this.registro);


  }
}
