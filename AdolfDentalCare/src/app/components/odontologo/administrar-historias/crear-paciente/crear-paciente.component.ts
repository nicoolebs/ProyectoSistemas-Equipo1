import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../../services/autentificacion.service';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent implements OnInit {

  registro: any;
  verificacion: any;

  constructor(private auth: AutentificacionService) { }

  ngOnInit(): void {
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

  crearPaciente() {

    console.log(this.registro);

    this.auth.crearPaciente(this.registro);

  }
}
