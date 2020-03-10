import { AutentificacionService } from './../../../services/autentificacion.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-dash',
  templateUrl: './nav-dash.component.html',
  styleUrls: ['./nav-dash.component.css']
})
export class NavDashComponent implements OnInit {

  // Input para recibir el tipo de usuario al que se le desea desplegar el navbar
  @Input() tipoUsuario: string;

  // Arreglo de rutas del navbar en general con todas la rutas de cualquier tipo de usuario
  navbar = [

    // Navegación de admin
    {nombre: 'Principal', url: 'dashboard-admin', sub: null, tipo: 'admin'},
    {nombre: 'Administrar Usuarios', url: 'dashboard-admin/administrar-usuarios', sub: null, tipo: 'admin'},
    {nombre: 'Ver Usuarios', url: 'dashboard-admin/ver-usuarios', sub: null, tipo: 'admin'},
    {nombre: 'Porcentajes de Cobro', url: 'dashboard-admin/porcentajes-de-cobro', sub: null, tipo: 'admin'},
    {nombre: 'Estadísticas', url: 'dashboard-admin/estadisticas', tipo: 'admin', sub: [
      // Navegación interna de la opción de estadísticas
      {nombre: 'Citas por Odontólogo', url: 'dashboard-admin/estadisticas/citas-por-odontólogo'},
      {nombre: 'Citas por Fecha', url: 'dashboard-admin/estadisticas/citas-por-fecha'},
      {nombre: 'Citas Pendientes', url: 'dashboard-admin/estadisticas/citas-pendientes'},
      {nombre: 'Ingresos', url: 'dashboard-admin/estadisticas/ingresos'}
    ]},

    // Navegación de doctor
    {nombre: 'Administrar Citas', url: 'dashboard-odontólogo/administrar-citas', tipo: 'doctor', sub: null},
    {nombre: 'Cronograma', url: 'dashboard-odontólogo/cronograma', tipo: 'doctor', sub: null},
    {nombre: 'Mis pacientes', url: 'dashboard-odontólogo/mis-pacientes', tipo: 'doctor', sub: null},
    {nombre: 'Administrar Historias', url: 'dashboard-odontólogo/administrar-historias', tipo: 'doctor', sub: null},
    {nombre: 'Mis Consultas', url: 'dashboard-odontólogo/mis-consultas', tipo: 'doctor', sub: null},
    {nombre: 'Comunicación', url: 'dashboard-odontólogo/comunicacion', tipo: 'doctor', sub: null},
    {nombre: 'Estado de Cuenta', url: 'dashboard-odontólogo/estado-de-cuenta', tipo: 'doctor', sub: null},
    {nombre: 'Medios de Pago', url: 'dashboard-odontólogo/medios-de-pago', tipo: 'doctor', sub: [
      // Navegación interna de la opción medios de pago
      {nombre: 'Configuración actual', url: 'dashboard-odontólogo/medios-de-pago'},
      {nombre: 'Paypal', url: 'dashboard-odontólogo/medios-de-pago/paypal'},
      {nombre: 'Zelle', url: 'dashboard-odontólogo/medios-de-pago/zelle'},
      {nombre: 'Cuenta Bancaria', url: 'dashboard-odontólogo/medios-de-pago/banco'}
    ]},

    // Navegación del paciente
    {nombre: 'Mis Citas', url: 'dashboard-paciente/citas-paciente', tipo: 'paciente', sub: null},
    {nombre: 'Mi Perfil', url: 'dashboard-paciente/mi-perfil', tipo: 'paciente', sub: null},
    {nombre: 'Mi Historia', url: 'dashboard-paciente/mi-historia', tipo: 'paciente', sub: null},
    {nombre: 'Pagos', url: 'dashboard-paciente/mis-pagos', tipo: 'paciente', sub: [
      // Navegación interna de la opción mis pagos
      {nombre: 'Mis Pagos', url: 'dashboard-paciente/mis-pagos'},
      {nombre: 'Pagar', url: 'dashboard-paciente/mis-pagos/pagar'}
    ]},
  ];

  // Arreglo en el que se guardan las rutas según el tipo de usuario
  navbarUsuario;

  constructor(
    private autentificacion: AutentificacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Se inicializa el arreglo de items del navbar segun el filtro que aplica el tipo de usuario
    this.navbarUsuario = this.navbar.filter(tipo => tipo.tipo === this.tipoUsuario);
  }

  // Método que se llama cuendo se hace click al botón salir
  salir() {
    this.autentificacion.cerrarSesion();
  }

  // Método para navegar a un enlace específico
  open(enlace){
    this.router.navigate([enlace]);
  }

}

