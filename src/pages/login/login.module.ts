import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad TransactionsPage');
  }


}
