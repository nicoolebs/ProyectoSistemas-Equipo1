import { Observable } from 'rxjs';
import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
 
  usuarioCollection : AngularFirestoreCollection<Usuario>;
  usuario: Observable<Usuario[]>;
  
  constructor(
    private fire: AngularFirestore
  ) {
    this.setDocuments();
  }

  // Método para crear un documento
  public createDocumento(data, coleccion, uid) {
    return this.fire.collection(coleccion).doc(uid).set(data);
  }

  // Obtiene un documento
  public getDocumento(documentId: string, coleccion: string) {
    return this.fire.collection(coleccion).doc(documentId).get();
  }
  // Obtiene todos los gatos
  public getCats() {
    return this.fire.collection('Usuarios').snapshotChanges();
  }
  // Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.fire.collection('cats').doc(documentId).set(data);
  }

  private setDocuments () {
    this.usuario = this.fire.collection('Usuarios').valueChanges();
  }

 getUsuarios(){
   return this.usuario;
 }

}
