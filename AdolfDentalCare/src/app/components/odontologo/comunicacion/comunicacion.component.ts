import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { Mensaje } from '../../../models/mensaje';

@Component({
  selector: 'app-comunicacion',
  templateUrl: './comunicacion.component.html',
  styleUrls: ['./comunicacion.component.css']
})
export class ComunicacionComponent implements OnInit {

  // Arreglo de pacientes
  pacientes: any[] = [];

  // Verificar seleccionados
  seleccionoPaciente = false;
  seleccionoMensaje = false;

  // Paciente y mensaje seleccionado (string)
  perfilActivo: string;
  mensajeActivo: string;

  // Tipo de mensaje para mostrar en la vista
  tipoDeMensaje = 0;

  // Paciente y mensajes
  paciente: any = null;
  mensaje: Mensaje = null;
  asuntito: string = '';
  texto: string = '';

  constructor(private auth: AutentificacionService, private baseDatos: FirestoreService) {
  }

  ngOnInit(): void {

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.auth.usuarioLogg.doctor.pacientes.length; index++) {
      this.baseDatos.getDocumento(this.auth.usuarioLogg.doctor.pacientes[index], 'Usuarios').subscribe(user => {
        this.pacientes.push(user.data());
      });
    }

  }

  cambiarPaciente() {

    this.paciente = this.pacientes.filter(pac => pac.uid === this.perfilActivo.substring(4, 32));
    this.seleccionoPaciente = true;

  }

  cambiarMensaje() {
    console.log(this.paciente);
    console.log(this.mensajeActivo);

    if (this.mensajeActivo == 'Recordatorio de Cita') {
      this.tipoDeMensaje = 1;
      this.mensaje = {
        email: this.paciente[0].email,
        asunto: 'Recordatorio de Cita',
        texto: `Buenos días, ${this.paciente[0].paciente.nombre} ${this.paciente[0].paciente.apellido}.
        <br>Este es un mensaje para recordarle que su próxima cita está cerca de ocurrir.
        <br>La fecha de su próxima cita es: colocarFecha`
      };
    } else if (this.mensajeActivo == 'Recordatorio de Pago Pendiente') {
      this.tipoDeMensaje = 2;
      this.mensaje = {
        email: this.paciente[0].email,
        asunto: 'Recordatorio de Pago Pendiente',
        texto: `Buenos días, ${this.paciente[0].paciente.nombre} ${this.paciente[0].paciente.apellido}.
        <br>Este es un mensaje para recordarle que posee una deuda pendiente con la clínica,
        le solicitamos realice el pago lo más pronto posible.
        <br>Su deuda pendiente es: colocarDeuda`
      };
    } else if (this.mensajeActivo == 'Mensaje Personalizado') {
      this.tipoDeMensaje = 3;
      this.mensaje = {
        email: this.paciente[0].email,
        asunto: '',
        texto: ``
      };
    } else {
      this.tipoDeMensaje = 0;
    }

    console.log(this.tipoDeMensaje);
    console.log(this.mensaje);

    this.seleccionoMensaje = true;

  }

  enviarMensaje() {

    if (this.tipoDeMensaje === 3) {
      this.mensaje.asunto = this.asuntito;
      this.mensaje.texto = this.texto;
    }

    console.log(this.mensaje);


    if (this.mensaje.asunto != '' && this.mensaje.texto != '') {
      this.baseDatos.createDocumento(this.mensaje, 'Correos', Math.round((Math.random() * 100000)).toString() +  this.paciente[0].uid)
      .then(corr => alert('Su mensaje ha sido enviado correctamente'))
      .catch (err => console.log(err));
    } else {
      alert('¡No puede enviar un mensaje con un campo vacío!');
    }

  }

}
