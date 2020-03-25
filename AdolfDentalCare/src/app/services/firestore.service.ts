import { Observable } from 'rxjs';
import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usuario: Observable<Usuario[]>;
  usuarioCollection : AngularFirestoreCollection<Usuario>;
  usuarioDoc: AngularFirestoreDocument<Usuario>;

  constructor(
    private fire: AngularFirestore
  ) {
    this.setDocuments();

  }

  // Método para crear un documento en una colección
  public createDocumento(data, coleccion, uid) {
    return this.fire.collection(coleccion).doc(uid).set(data);
  }

  // Obtiene un documento de una colección
  public getDocumento(documentId: string, coleccion: string) {
    return this.fire.collection(coleccion).doc(documentId).get();
  }

  // Obtiene todos los documentos de una colección
  public getDocumentos(coleccion) {
    return this.fire.collection(coleccion).snapshotChanges();
  }

  // Actualiza un documento
  public updateDocumento(documentId: string, data: any, coleccion) {
    return this.fire.collection(coleccion).doc(documentId).set(data);
  }

  // Elimina un documento
  public deleteDocumento(documentId: string, coleccion) {
    return this.fire.collection(coleccion).doc(documentId).delete();
  }

  // Recupera la información de la base de datos de los usuarios
  private setDocuments() {
    this.usuario = this.fire.collection('Usuarios').valueChanges();
  }

  // Método para borrar usuarios del FireStore
  deleteUser(usuario : Usuario){
    this.usuarioDoc = this.fire.doc(`Usuarios/${usuario}`);
    this.usuarioDoc.delete();
  }

  getUsuarios(){
    return this.usuario;
 }

 setUsuario(user : Usuario){
    this.usuarioCollection.add(user);
}

}
