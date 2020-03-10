import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odontologo',
  templateUrl: './odontologo.component.html',
  styleUrls: ['./odontologo.component.css']
})
export class OdontologoComponent implements OnInit {

  tipo = 'doctor';

  constructor() { }

  ngOnInit(): void {
  }

}
