import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AutentificacionService } from './../../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  public formGroup: FormGroup;
  public email = '';
  public contrasena = '';
  usuario: firebase.User;
  public dataUsuario;

  constructor( public afAuth: AngularFireAuth,
               private router: Router,
               private autentificacion: AutentificacionService,
               private formBuilder: FormBuilder,
               private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    contrasena: ['', Validators.required]
  });
}

  iniciarSesion() {
    this.autentificacion.iniciarSesion(this.email, this.contrasena)
    .then(res => {
    }).catch(err => alert(err));
  }

  open(enlace) {
    this.router.navigate([enlace]);
  }
}
