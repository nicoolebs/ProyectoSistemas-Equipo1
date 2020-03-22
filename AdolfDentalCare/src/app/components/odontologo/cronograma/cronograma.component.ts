import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  cronograma = [
    {dia: 0, horas: [
      {hora: '10:00', libre: true},
      {hora: '11:00', libre: true},
      {hora: '12:00', libre: true},
      {hora: '13:00', libre: true},
      {hora: '14:00', libre: true},
      {hora: '15:00', libre: true},
      {hora: '16:00', libre: true},
    ]},
    {dia: 1, horas: [
      {hora: '10:00', libre: true},
      {hora: '11:00', libre: true},
      {hora: '12:00', libre: true},
      {hora: '13:00', libre: true},
      {hora: '14:00', libre: true},
      {hora: '15:00', libre: true},
      {hora: '16:00', libre: true},
    ]},
    {dia: 2, horas: [
      {hora: '10:00', libre: true},
      {hora: '11:00', libre: true},
      {hora: '12:00', libre: true},
      {hora: '13:00', libre: true},
      {hora: '14:00', libre: true},
      {hora: '15:00', libre: true},
      {hora: '16:00', libre: true},
    ]},
    {dia: 3, horas: [
      {hora: '10:00', libre: true},
      {hora: '11:00', libre: true},
      {hora: '12:00', libre: true},
      {hora: '13:00', libre: true},
      {hora: '14:00', libre: true},
      {hora: '15:00', libre: true},
      {hora: '16:00', libre: true},
    ]},
    {dia: 4, horas: [
      {hora: '10:00', libre: true},
      {hora: '11:00', libre: true},
      {hora: '12:00', libre: true},
      {hora: '13:00', libre: true},
      {hora: '14:00', libre: true},
      {hora: '15:00', libre: true},
      {hora: '16:00', libre: true},
    ]},
    {dia: 5, horas: [
      {hora: '10:00', libre: true},
      {hora: '11:00', libre: true},
      {hora: '12:00', libre: true},
      {hora: '13:00', libre: true},
      {hora: '14:00', libre: true},
      {hora: '15:00', libre: true},
      {hora: '16:00', libre: true},
    ]},
    {dia: 6, horas: [
      {hora: '10:00', libre: true},
      {hora: '11:00', libre: true},
      {hora: '12:00', libre: true},
      {hora: '13:00', libre: true},
      {hora: '14:00', libre: true},
      {hora: '15:00', libre: true},
      {hora: '16:00', libre: true},
    ]}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
