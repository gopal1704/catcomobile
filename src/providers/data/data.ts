import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/take'
import { scan } from 'rxjs/operator/scan';
import { FirebaseApp } from 'angularfire2';
import { take } from 'rxjs/operator/take';
import { AuthProvider } from '../auth/auth';
@Injectable()
export class DataProvider {

  public uid : string ;
  constructor(public http: HttpClient,
        public afs: AngularFirestore,
        public auth : AuthProvider
  ) {
    this.uid= this.auth.user_id;
    console.log('Hello DataProvider Provider');

  }
  get_transactions() {
    console.log("transactions");
   console.log(this.uid);

    var transactionscollection = this.afs.collection('transactions', ref => {
      return ref.where('uid', '==', this.auth.user_id).orderBy('timestamp', 'desc')
    });
    return transactionscollection.valueChanges();


  }
  get_accountsummary(){

  }


}
