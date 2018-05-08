import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth'
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
username : string;
password : string;
  constructor(
    private menu: MenuController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController, 
    public navParams: NavParams,
     private afAuth: AngularFireAuth,
     private afs: AngularFirestore,
     public auth : AuthProvider,
     public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
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
