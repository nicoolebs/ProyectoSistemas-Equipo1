import { AutentificacionService } from './../../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';

@Component({
  selector: 'app-administrar-historias',
  templateUrl: './administrar-historias.component.html',
  styleUrls: ['./administrar-historias.component.css']
})
export class AdministrarHistoriasComponent implements OnInit {

  creacionPaciente = false;
  pacientes: any[] = [];
  pacienteActivo: any;
  paciente: any;
  seleccionado = false;
  historia: any[] = [];

  constructor(private auth: AutentificacionService, private baseDatos: FirestoreService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    for (let index = 0; index < this.auth.usuarioLogg.doctor.pacientes.length; index++) {

      this.baseDatos.getDocumento(this.auth.usuarioLogg.doctor.pacientes[index], 'Usuarios').subscribe(paciente => {
        this.pacientes.push(paciente.data());
        console.log(this.pacientes);
      });

    }

  }

  verForm() {

    this.creacionPaciente = !this.creacionPaciente;

  }

  verHistoria() {

    this.paciente = this.pacientes.filter(filtro => filtro.uid === this.pacienteActivo.substring(0, 28));
    this.paciente = this.paciente[0];

    for (let index = 0; index < this.paciente.paciente.historia.length; index++) {
      this.baseDatos.getDocumento(this.paciente.paciente.historia[index],'Citas').subscribe(cita => {
        this.historia.push(cita.data());
      });
    }

    console.log(this.historia);


    this.seleccionado = true;


  }

  uploadFile(event, i) {
    console.log(this.historia[i]);
    const file = event.target.files[0];
    const filePath = this.historia[i].id;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then( snapshot => {

      snapshot.ref.getDownloadURL().then(link => {

        this.historia[i].archivo = link;
        this.baseDatos.updateDocumento(this.historia[i].id, this.historia[i], 'Citas').then(corr => {
          alert('Archivo modificado con éxito.');
        });

      });

    });

  }

}
