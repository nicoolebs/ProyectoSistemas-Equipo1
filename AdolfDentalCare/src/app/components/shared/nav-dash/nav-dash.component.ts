import { AutentificacionService } from './../../../services/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-dash',
  templateUrl: './nav-dash.component.html',
  styleUrls: ['./nav-dash.component.css']
})
export class NavDashComponent implements OnInit {

  navbar = [
    {nombre: 'PERFIL', url: 'dashboard-paciente'},
    {nombre: 'HISTORIAL', url: 'historia-paciente'},
    {nombre: 'PAGOS', url: 'pagos-paciente'},
  ];

  constructor(private autentificacion: AutentificacionService,
    private router: Router) { }

  ngOnInit(): void {
  }

  salir(){
    this.autentificacion.cerrarSesion();
    this.router.navigate(['']);
  }

  open(enlace){
    this.router.navigate([enlace]);
  }

}

