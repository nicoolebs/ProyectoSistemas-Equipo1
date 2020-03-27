import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Router } from '@angular/router';

declare var paypal;

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {

  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  deuda: number;
  pagosPendientes: any[] = [];
  citaSeleccionada: boolean[] = [];
  citasPagar: any[] = [];
  monto: number = 0;
  pago = false;
  metodoDePago: any;

  pagado = false;

  email: any;
  nombre: any;
  referencia: any;
  titular: any;
  banco: any;

  constructor(
    private auth: AutentificacionService,
    private baseDatos: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {

    for (let index = 0; index < this.auth.usuarioLogg.paciente.historia.length; index++) {

      this.baseDatos.getDocumento(this.auth.usuarioLogg.paciente.historia[index], 'Citas').subscribe(cita => {

        if (cita.data().paga === false && cita.data().costo !== 0) {
          this.pagosPendientes.push(cita.data());
          this.citaSeleccionada.push(false);
        }

      });

    }

    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description: 'Pago de citas con paypal',
            amount: {
              currency_code: 'USD',
              value: this.monto
            }
          }]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        this.pagado = true;
        console.log(order);
        this.reportarPagoPaypal(order);
      },
      onError: err => {
        console.log(err);
      }
    }).render(this.paypalElement.nativeElement);

  }

  seleccionarCitas() {

    this.citasPagar = [];
    this.monto = 0;

    for (let index = 0; index < this.citaSeleccionada.length; index++) {

      if (this.citaSeleccionada[index] === true) {
        this.citasPagar.push(this.pagosPendientes[index]);
        this.monto = this.monto + this.pagosPendientes[index].costo;
      }

    }

    this.pago = true;

  }

  reportarPagoPaypal(order) {

    let factura = {
      info:
      'Email: ' + this.auth.usuarioLogg.email +
      ', Nombre: ' + this.auth.usuarioLogg.paciente.nombre +
      ' ' + this.auth.usuarioLogg.paciente.apellido + ', Referencia: ' + order.id,
      paciente: this.auth.usuarioLogg.uid,
      monto: this.monto,
      ref: order.id,
      fecha: new Date().toString(),
      medio: 'Paypal'
    };

    this.baseDatos.createDocumento(factura, 'Facturas', factura.paciente + factura.fecha.toString()).then( corr => {

      for (let index = 0; index < this.citasPagar.length; index++) {

        this.citasPagar[index].paga = true;

        this.baseDatos.updateDocumento(this.citasPagar[index].id, this.citasPagar[index], 'Citas');

      }

      alert('Pago reportado con éxito.');

      this.router.navigate(['dashboard-paciente/mi-perfil']);
    });
  }

  reportarPagoZelle() {
    let factura = {
      info:
      'Email: ' + this.email + ', Nombre: ' + this.nombre + ', Referencia: ' + this.referencia,
      paciente: this.auth.usuarioLogg.uid,
      monto: this.monto,
      ref: this.referencia,
      fecha: new Date().toString(),
      medio: 'Zelle'
    };

    this.baseDatos.createDocumento(factura, 'Facturas', factura.paciente + factura.fecha.toString()).then( corr => {

      for (let index = 0; index < this.citasPagar.length; index++) {

        this.citasPagar[index].paga = true;

        this.baseDatos.updateDocumento(this.citasPagar[index].id, this.citasPagar[index], 'Citas');

      }

      alert('Pago reportado con éxito.');

      this.router.navigate(['dashboard-paciente/mi-perfil']);
    });

  }

  reportarPagoBanco() {
    let factura = {
      info:
      'Titular: ' + this.titular + ', Banco: ' + this.banco + ', Referencia: ' + this.referencia,
      paciente: this.auth.usuarioLogg.uid,
      monto: this.monto,
      ref: this.referencia,
      fecha: new Date().toString(),
      medio: 'Banco'
    };

    this.baseDatos.createDocumento(factura, 'Facturas', factura.paciente + factura.fecha.toString()).then( corr => {

      for (let index = 0; index < this.citasPagar.length; index++) {

        this.citasPagar[index].paga = true;

        this.baseDatos.updateDocumento(this.citasPagar[index].id, this.citasPagar[index], 'Citas');

      }

      alert('Pago reportado con éxito.');

      this.router.navigate(['dashboard-paciente/mi-perfil']);
    });

  }
}
