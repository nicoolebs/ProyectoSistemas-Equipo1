import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AutentificacionService } from '../../services/autentificacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public registro: FormGroup;
  authError: any;

  constructor( private formBuilder: FormBuilder, private router: Router, private autentificacion: AutentificacionService ) { }

  public ngOnInit() {
    this.buildForm();
    this.autentificacion.eventError$.subscribe( data => {
      this.authError = data;
    });
  }

  private buildForm() {
    this.registro = this.formBuilder.group({
      email: [''],
      contrasena: [''],
      vContrasena: [''],
      nombre: [''],
      apellido: [''],
      nacimiento: [''],
      telefono: [''],
      direccion: [''],
      antecedentes: [''],
      alergias: [''],
      genero: ['']
    });
  }

  public registrar(formulario) {
    this.autentificacion.registrarUser(formulario.value);
  }
}
