import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  navbar: string[] = [
    'INICIO', 'SOBRE NOSOTROS', 'SERVICIOS', 'NUESTRO PORTAL', 'CONTACTO'
  ];
  redesSociales: string[] = [
    '../../../assets/mail.png', '../../../assets/instagram-2.png', '../../../assets/twitter.png', '../../../assets/whatsapp.png'
  ];

  constructor() { }

}
