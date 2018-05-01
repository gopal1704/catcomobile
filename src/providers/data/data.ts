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
@Injectable()
export class DataProvider {
  constructor(public http: HttpClient
  ,
 public  afs : AngularFirestore
  ) {
    console.log('Hello DataProvider Provider');

  }
  get_transactions(){
    console.log("transactions");
   

      var transactionscollection = this.afs.collection('transactions', ref => {
        return ref.where('uid', '==', 'YeYKxJeIpxXXa2ejwqdvdZDmdsi2').orderBy('timestamp','desc').limit(10)
      });
  return transactionscollection.valueChanges();
  
  
  
      
   

  }


}
