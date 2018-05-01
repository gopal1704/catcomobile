import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {AuthProvider} from '../../providers/auth/auth'
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    this.auth.login();
  }


}
