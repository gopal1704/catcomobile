import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth'
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
username : string;
password : string;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, 
    public navParams: NavParams,
     private afAuth: AngularFireAuth,
     private afs: AngularFirestore,
     public auth : AuthProvider,
     public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.auth.login();
    
  
  }
  login(){

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    

//login logic 
this.afAuth.auth.signInWithEmailAndPassword(this.username,this.password).then((value)=>{
console.log('login....');
loader.dismiss();
console.log(value);
this.auth.loggedin=true;
console.log(value.uid);
this.auth.user_id=value.uid;

 this.afs.doc<any>(`accountsummary/${this.auth.user_id}`).valueChanges().subscribe((v)=>{
  this.auth.user_summary = v;
  this.navCtrl.popToRoot();

 });





}).catch(err=>{
  loader.dismiss();
  let alert = this.alertCtrl.create({
    title: 'Login Failed!',
    subTitle: 'Incorect email or password ',
    buttons: ['OK']
  });
  alert.present();

})



//
  

}

}
