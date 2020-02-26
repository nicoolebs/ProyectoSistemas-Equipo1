import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AutentificacionService } from './../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  public formGroup: FormGroup;
  public email = '';
  public contrasena = '';

  constructor( public afAuth: AngularFireAuth,
               private router: Router,
               private autentificacion: AutentificacionService,
               private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    contrasena: ['', Validators.required, Validators.minLength(8)]
  });
}

  iniciarSesion(): void {
    this.autentificacion.iniciarSesion(this.email, this.contrasena)
    .then((res) => {
    this.router.navigate(['/dashboard-paciente']);
    }).catch(err => alert(err));
  }
}
