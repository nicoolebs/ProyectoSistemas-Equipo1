import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public formGroup: FormGroup;

  constructor( private formBuilder: FormBuilder ) { }

  public ngOnInit() {
    this.buildForm();
  }
  private buildForm(){
    const today = new Date().toISOString().substring(0, 10);
    this.formGroup = this.formBuilder.group({
    registeredOn: today,
    email: ['', Validators.required, Validators.email],
    contrasena: ['', Validators.required, Validators.minLength(8)],
    vContrasena: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    nacimiento: ['', Validators.required],
    telefono: ['', Validators.required],
    direccion: ['', Validators.required],
    antecedentes: ['', Validators.required],
    alergias: ['', Validators.required],
    genero: ['', Validators.required],
  });
}

public registrar(){
console.log("Diste clic");

}

}
