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
    contrasena: ['', Validators.required, Validators.minLength(8)]
  });
}

  iniciarSesion() {
    this.autentificacion.iniciarSesion(this.email, this.contrasena)
    .then(res => {

      this.autentificacion.getEstadoUsuario().subscribe( usuario => {
          this.usuario = usuario;
          this.firestore.getDocumento(usuario.uid, 'Usuarios').subscribe( user => {
            this.dataUsuario = user.data();

            if (this.dataUsuario.tipo === 'paciente') {
              this.router.navigate(['/dashboard-paciente']);
            } else if (this.dataUsuario.tipo === 'doctor' ) {
              this.router.navigate(['/dashboard-odontologo']);
            } else if (this.dataUsuario.tipo === 'admin') {
              this.router.navigate(['/dashboard-administrador']);
            }
          });
      });

    }).catch(err => alert(err));
  }
}
