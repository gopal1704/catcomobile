import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/switchmap';
// import 'rxjs/add/operator/map'
// import 'rxjs/add/observable/throw';


@Injectable()
export class AuthProvider {


  public loggedin : boolean = false;
  public user_id : string = "";
  public user_summary : any = {};
  constructor(public http: HttpClient,private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  login(){
    console.log('auth provider');
  }



}
