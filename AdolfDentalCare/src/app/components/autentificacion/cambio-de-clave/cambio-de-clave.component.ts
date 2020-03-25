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
        email: ['']
      });
    }

  ngOnInit(): void {
  }

  cambiarClave() {

      this.auth.cambiarClave(this.cambioClave.value.email);

  }

}
