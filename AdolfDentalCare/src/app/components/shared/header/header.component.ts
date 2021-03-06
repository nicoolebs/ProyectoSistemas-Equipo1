import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  navbar = [
    {nombre: 'INICIO', url: 'inicio'},
    {nombre: 'SOBRE NOSOTROS', url: 'sobre-nosotros'},
    {nombre: 'SERVICIOS', url: 'servicios'},
    {nombre: 'NUESTRO PORTAL', url: 'nuestro-portal'},
    {nombre: 'CONTACTO', url: 'contacto'},
  ];

 

  constructor(private router: Router) { }

  open(enlace) {
    this.router.navigate([enlace]);
  }
}
