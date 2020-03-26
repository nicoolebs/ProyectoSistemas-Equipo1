import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {
// COLOCAR AfterViewChecked EN IMPLEMENTS

  // addScript: boolean = false;
  // paypalLoad: boolean = true;
  // finalAmount: number = 1;

  // paypalConfig = {
  //   env: 'sandbox',
  //   client: {
  //     sandbox: 'Acfn54kFJGzkmDRZAkDiRnSOnRtc05xLcuo1-3wShC8ri_zg60PPRX3yO1oM4TN6PhSWeEBq2ymNIn_v',
  //     production: '<your-production-key here>'
  //   },
  //   commit: true,
  //   payment: (data, actions) => {
  //     return actions.payment.create({
  //       payment: {
  //         transactions: [
  //           { amount: { total: this.finalAmount, currency: 'UDS' } }
  //         ]
  //       }
  //     });
  //   },
  //   onAuthorize: (data, actions) => {
  //     return actions.payment.execute().then((payment) => {
  //       //Do something when payment is successful.
  //     })
  //   }
  // };

  // ngAfterViewChecked(): void {
  //   if (!this.addScript) {
  //     this.addPaypalScript().then(() => {
  //       paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
  //       this.paypalLoad = false;
  //     })
  //   }
  // }

  // addPaypalScript() {
  //   this.addScript = true;
  //   return new Promise((resolve, reject) => {
  //     let scripttagElement = document.createElement('script');
  //     scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
  //     scripttagElement.onload = resolve;
  //     document.body.appendChild(scripttagElement);
  //   })
  // }

  deuda: number;
  pagosPendientes: any[] = [];
  citaSeleccionada: boolean[] = [];
  citasPagar: any[] = [];
  monto: number = 0;
  pago = false;
  metodoDePago: any;

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

      console.log('Pago reportado con éxito.');

      this.router.navigate(['dashboard-paciente/mis-pagos']);
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

      console.log('Pago reportado con éxito.');

      this.router.navigate(['dashboard-paciente/mis-pagos']);
    });

  }
}
