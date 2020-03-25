import { AutentificacionService } from './../../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-administrar-historias',
  templateUrl: './administrar-historias.component.html',
  styleUrls: ['./administrar-historias.component.css']
})
export class AdministrarHistoriasComponent implements OnInit {

  creacionPaciente = false;
  pacientes: any[] = [];

  constructor(private auth: AutentificacionService, private baseDatos: FirestoreService) { }

  ngOnInit(): void {
    for (let index = 0; index < this.auth.usuarioLogg.doctor.pacientes.length; index++) {

      this.baseDatos.getDocumento(this.auth.usuarioLogg.doctor.pacientes[index],'Usuarios').subscribe(paciente => {
        this.pacientes.push(paciente.data);
      });

    }
  }

  verForm() {
    this.creacionPaciente = !this.creacionPaciente;

  }
}
