import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  razones: string[] = [
    '../../../assets/Razon1.png',
    '../../../assets/Razon2.png',
    '../../../assets/Razon3.png',
    '../../../assets/Razon4.png',
    '../../../assets/Razon5.png',
    '../../../assets/Razon6.png'
  ];

  servicios = [
    {imagen: '../../../assets/servicio1.jpg',
    titulo: 'Odontología General',
    descripcion: 'Brindan servicios relacionados con el mantenimiento de la higiene bucal y la salud dental.'},
    {imagen: '../../../assets/servicio2.png',
    titulo: 'Cirugía Dental',
    descripcion: 'Contamos con extracción de cordales, extracciones dentarias simples y cirugías periapicales.'},
    {imagen: '../../../assets/servicio3.jpg',
    titulo: 'Implantes Dentales',
    descripcion: 'Nuestros implantes dentales pueden ayudarlo a sonreír con más confianza.'},
    {imagen: '../../../assets/servicio4.jpg',
    titulo: 'Ortodoncia',
    descripcion: 'La belleza de la sonrisa es el gran norte y objetivo supremo de la Ortodoncia.'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
