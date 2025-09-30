import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, collection, setDoc, doc, getDoc, addDoc, query, getDocs, updateDoc } from 'firebase/firestore';
import { Utils } from './utils';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(Utils);
  storage = inject(AngularFireStorage);

  ///// Autenticacion /////
  getAuth() {
    return getAuth();
  }




  ///// Acceder /////


  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  ///// crear usuario /////


  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);



  }

  ///// buscar usuario por correo /////
  async getUserByEmail(email: string): Promise<User | undefined> {
    const snapshot = await this.firestore.collection<User>('Users', ref => ref.where('email', '==', email)).get().toPromise();
    if (snapshot && !snapshot.empty) {
      return snapshot.docs[0].data() as User;
    }
    return undefined;
  }


  ///// actualizar usuario /////


  updatrUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }


  ///// enviar email para resetear la contraseña /////
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);

  }



  ///// cerrar sesion /////

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerlink('/auth');
  }

  //==================== Base de Datos ====================

  //======= Obtener documentos de una colección =======
  async getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    const q = collectionQuery ? query(ref, collectionQuery) : ref;
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data(), {idField: 'id'});
  }

  //======= Setear un documento =======
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }


  //======= Actualizar un documento =======
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  //======= Obtener un documento =======
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //======= Agregar un documento =======
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  // Subir imagen y obtener URL
  async uploadImage(path: string, dataUrl: string): Promise<string> {
    const ref = this.storage.ref(path);
    await ref.putString(dataUrl, 'data_url');
    return await ref.getDownloadURL().toPromise();
  }

  async getFilePath(url: string){
    return ref(getStorage(), url).fullPath;
  }
}
