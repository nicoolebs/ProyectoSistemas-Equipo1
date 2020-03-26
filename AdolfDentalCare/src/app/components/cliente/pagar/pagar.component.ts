import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { FirestoreService } from '../../../services/firestore.service';

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
  pago = false;
  metodoDePago: any;


  constructor(
    private auth: AutentificacionService,
    private baseDatos: FirestoreService
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

    for (let index = 0; index < this.citaSeleccionada.length; index++) {

      if (this.citaSeleccionada[index] === true) {
        this.citasPagar.push(this.pagosPendientes[index]);
      }

    }

    this.pago = true;

  }
}
