import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  // HACER Dinamico
  sliderItems = [
    {imagen: '../../../assets/images/slider2.jpg',
    titulo: 'BIENVENIDO A ADOLF DENTAL CARE',
    texto: 'Cuidado dental de alta calidad.',
    boton: 'SOBRE NOSOTROS'},

    {imagen: '../../../assets/images/slider2.jpg',
    titulo: 'TU CLÍNICA A UNA PANTALLA DE DISTANCIA',
    texto: 'La primera clínica dental a un click de tu hogar.',
    boton: 'NUESTRO PORTAL'},

    {imagen: '../../../assets/images/slider2.jpg',
    titulo: 'LOS MEJORES SERVICIOS',
    texto: 'Ofrece los mejores servicios a una pantalla de distancia.',
    boton: 'SERVICIOS'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
