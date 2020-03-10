import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {
  
  usuariosDelSistema;

  constructor(private fire : FirestoreService) { }

  ngOnInit(): void {

     this.fire.getUsuarios().subscribe(
     usuario => {
       this.usuariosDelSistema = usuario
       });      
  }

}
