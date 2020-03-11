import { AutentificacionService } from './../../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambio-de-clave',
  templateUrl: './cambio-de-clave.component.html',
  styleUrls: ['./cambio-de-clave.component.css']
})
export class CambioDeClaveComponent implements OnInit {

  cambioClave: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AutentificacionService) {
      this.cambioClave = this.formBuilder.group({
        email: [''],
        contrasena: [''],
        nuevaContrasena: [''],
        rNuevaContrasena: ['']
      });
    }

  ngOnInit(): void {
  }

  cambiarClave() {

    let valida = this.auth.validarClave(this.cambioClave.value.nuevaContrasena, this.cambioClave.value.rNuevaContrasena);

    if (valida) {

      console.log(this.cambioClave.value.email, this.cambioClave.value.contrasena);

      this.auth.cambiarClave(this.cambioClave.value.nuevaContrasena, this.cambioClave.value.email, this.cambioClave.value.contrasena);

    } else {

      alert('Claves incongruentes');
    }

  }




}
