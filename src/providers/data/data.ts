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
  public investment_amount : number ;
  public uid: string;
  constructor(public http: HttpClient,
    public afs: AngularFirestore,
    public auth: AuthProvider
  ) {
    this.uid = this.auth.user_id;
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
  get_investments() {

    var investmentscollection = this.afs.collection('investments', ref => {
      return ref.where('uid', '==', this.auth.user_id).orderBy('timestamp', 'desc');

    });
    return investmentscollection.valueChanges();
  }
  get_accountsummary() {
    return this.afs.doc<any>(`accountsummary/${this.auth.user_id}`).valueChanges();

  }

  get_profile() {
    return this.afs.doc<any>(`users/${this.auth.user_id}`).valueChanges();

  }
  withdrawal_request(data) {



    const usersummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${this.auth.user_id}`); //get the refrence for updating initial user data
    usersummaryref.update({
      walletbalance: parseInt(this.auth.user_summary.walletbalance) - parseInt(data.amount),
      walletpendingbalance: parseInt(this.auth.user_summary.walletpendingbalance) + parseInt(data.amount)
    }).then(v => {


      data.name = this.auth.user_summary.name;
      data.status = 'pending';
      data.uid = this.auth.user_summary.uid;
      data.timestamp = Date.now();
      var ref = this.afs.collection('/withdrawalrequest');
      ref.add(data)
        ;




    })





  }

  /***********WALLET TRANSFER*************** */
  transfer_to_wallet(amount, to_wallet) {

    var reftrans = this.afs.collection('/transactions');
    const toaccountsummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${to_wallet}`);
    const fromaccountsummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${this.auth.user_id}`);

    var transaction_to = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: to_wallet,
      type: 'CWT',
      status: 'success',
      from: this.auth.user_id,
      to: to_wallet,
      amount: 0,
      debit: 0,
      credit: amount,
      narration: `Credit Wallet Transfer  from : ${this.auth.user_summary.name} ${this.auth.user_id}`
    };

    var transaction_from = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: this.auth.user_id,
      type: 'DWT',
      status: 'success',
      from: this.auth.user_id,
      to: to_wallet,
      amount: 0,
      debit: amount,
      credit: 0,
      narration: `Debit Wallet Transfer to : ${to_wallet}`
    };

    reftrans.add(transaction_from).then(() => {
      reftrans.add(transaction_to).then(() => {

        //UPDATE SUMMARY DATA
        this.afs.doc<any>(`accountsummary/${to_wallet}`).valueChanges().take(1).subscribe((v) => {

          toaccountsummaryref.update({
            walletbalance: v.walletbalance + parseInt(amount)
          }).then(() => {

            this.afs.doc<any>(`accountsummary/${this.auth.user_id}`).valueChanges().take(1).subscribe((v) => {

              fromaccountsummaryref.update({
                walletbalance: v.walletbalance - parseInt(amount)

              });
            });

            // fromaccountsummaryref.update({
            //   walletbalance: v.walletbalance - amount

            // });





          });

        });




      });
    });


  }//wallet transfer

  //investment wallet


  create_investmentwallet(scheme: string, amount: any) {
    var summary;


    ///////////////////// Investment Data 

    ////////////////////////////////////// Transaction Data

    var transaction_user = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: this.auth.user_id,
      type: 'DI',
      status: 'success',
      from: '',
      to: '',
      amount:parseInt(amount) ,
      debit: 0,
      credit: 0,
      narration: `Investment - SCO1 - Wallet Payment Amount : ${amount}`


    }
    var transaction_referral = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: this.auth.user_summary.referralid,
      type: 'CSC',
      status: 'success',
      from: this.auth.user_id,
      to: '',
      amount: 0,
      debit: 0,
      credit: Math.round(amount * 0.05),
      narration: `Credit referral comission 5%. from ${this.auth.user_summary.name} -- account ${this.auth.user_id} `
    }



    var Investment: AngularFirestoreCollection<any>;
    var ref = this.afs.collection('/investments');
    var reftrans = this.afs.collection('/transactions');


    var name = this.afs.doc<any>(`accountsummary/${this.auth.user_summary.referralid}`).valueChanges();
    ////
    name.take(1).subscribe(v => {
      console.log(v)
      var investment = {
        uid: this.auth.user_id,
        referralid: this.auth.user_summary.referralid,
        scheme: scheme,
        amount: parseInt(amount),
        interest_rate: 24,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'active',
        duration: 90,
        name: this.auth.user_summary.name,
        refname: v.name,
        first_bonus: false,
        second_bonus: false,
        third_bonus: false

      }

      ref.add(investment).then((v) => {

        const usersummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${this.auth.user_id}`); //get the refrence for updating initial user data
        const referralsummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${this.auth.user_summary.referralid}`);



        usersummaryref.update({

          totalinvestment: this.auth.user_summary.totalinvestment + parseInt(amount),
          walletbalance: this.auth.user_summary.walletbalance - parseInt(amount),
          transaction: true

        }).then(
          (v) => {
            console.log("success");

            reftrans.add(transaction_user).then((a) => {
              reftrans.add(transaction_referral).then((v) => {
                this.afs.doc<any>(`accountsummary/${this.auth.user_summary.referralid}`).valueChanges().take(1).subscribe((v) => {
                  var pendingwalbal = Math.round(v.walletpendingbalance + parseInt(amount) * 0.05);
                  var _totalstopearnings = Math.round(v.totalspotearnings + parseInt(amount) * 0.05);
                  referralsummaryref.update({
                    walletpendingbalance: pendingwalbal,
                    totalspotearnings: _totalstopearnings
                  });

                });


              });

            }
            );


          }

          );



      });


    })

    //////ee












  }

  create_investment_btc(scheme: string, amount: any, btc : any) {
    var summary;


    ///////////////////// Investment Data 

    ////////////////////////////////////// Transaction Data

    var transaction_user = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: this.auth.user_id,
      type: 'DI',
      status: 'success',
      from: '',
      to: '',
      amount:parseInt(amount) ,
      debit: 0,
      credit: 0,
      narration: `Investment - SCO1 - Wallet Payment Amount : ${amount} - BTC ${btc}`


    }
    var transaction_referral = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: this.auth.user_summary.referralid,
      type: 'CSC',
      status: 'success',
      from: this.auth.user_id,
      to: '',
      amount: 0,
      debit: 0,
      credit: Math.round(amount * 0.05),
      narration: `Credit referral comission 5%. from ${this.auth.user_summary.name} -- account ${this.auth.user_id} `
    }



    var Investment: AngularFirestoreCollection<any>;
    var ref = this.afs.collection('/investments');
    var reftrans = this.afs.collection('/transactions');


    var name = this.afs.doc<any>(`accountsummary/${this.auth.user_summary.referralid}`).valueChanges();
    ////
    name.take(1).subscribe(v => {
      console.log(v)
      var investment = {
        uid: this.auth.user_id,
        referralid: this.auth.user_summary.referralid,
        scheme: scheme,
        amount: parseInt(amount),
        interest_rate: 24,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'active',
        duration: 90,
        name: this.auth.user_summary.name,
        refname: v.name,
        first_bonus: false,
        second_bonus: false,
        third_bonus: false

      }

      ref.add(investment).then((v) => {

        const usersummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${this.auth.user_id}`); //get the refrence for updating initial user data
        const referralsummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${this.auth.user_summary.referralid}`);



        usersummaryref.update({

          totalinvestment: this.auth.user_summary.totalinvestment + parseInt(amount),
          walletbalance: this.auth.user_summary.walletbalance - parseInt(amount),
          transaction: true

        }).then(
          (v) => {
            console.log("success");

            reftrans.add(transaction_user).then((a) => {
              reftrans.add(transaction_referral).then((v) => {
                this.afs.doc<any>(`accountsummary/${this.auth.user_summary.referralid}`).valueChanges().take(1).subscribe((v) => {
                  var pendingwalbal = Math.round(v.walletpendingbalance + parseInt(amount) * 0.05);
                  var _totalstopearnings = Math.round(v.totalspotearnings + parseInt(amount) * 0.05);
                  referralsummaryref.update({
                    walletpendingbalance: pendingwalbal,
                    totalspotearnings: _totalstopearnings
                  });

                });


              });

            }
            );


          }

          );



      });


    })

    //////ee












  }




}
