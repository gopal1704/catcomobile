import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';
DataProvider
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public auth :AuthProvider,public data_service : DataProvider) {

    if(this.auth.loggedin==false){

      this.navCtrl.push(LoginPage,);

    }
    else{
      
    }

   


  }

}
