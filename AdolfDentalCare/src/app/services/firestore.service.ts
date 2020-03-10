import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private fire: AngularFirestore
  ) {}

  // Método para crear un documento en una colección
  public createDocumento(data, coleccion, uid) {
    return this.fire.collection(coleccion).doc(uid).set(data);
  }

  // Obtiene un documento de una colección
  public getDocumento(documentId: string, coleccion: string) {
    return this.fire.collection(coleccion).doc(documentId).get();
  }

  // Obtiene todos los documentos de una colección
  public getDocuementos(coleccion) {
    return this.fire.collection(coleccion).snapshotChanges();
  }

  // Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.fire.collection('cats').doc(documentId).set(data);
  }


}
