import { AutentificacionService } from './../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-dash',
  templateUrl: './nav-dash.component.html',
  styleUrls: ['./nav-dash.component.css']
})
export class NavDashComponent implements OnInit {

  navbar = [
    {nombre: 'PERFIL', url: 'dashboard-paciente'},
    {nombre: 'HISTORIAL', url: 'mi-historia-paciente'},
    {nombre: 'PAGOS', url: 'mis-pagos-paciente'},
  ];

  constructor(private autentificacion: AutentificacionService) { }

  ngOnInit(): void {
  }

  salir(){
    this.autentificacion.cerrarSesion();
  }

}

