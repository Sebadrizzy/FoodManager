import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(Utils);

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

  ///// base de datos ///// 




  ///// crear documento /////
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }


  ///// obtener documento /////

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

}