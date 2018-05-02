import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public Accountsummary: any;
  constructor(public navCtrl: NavController, public auth: AuthProvider, public data_service: DataProvider,
    public loadingCtrl: LoadingController
  ) {
    this.Accountsummary = {};

    if (this.auth.loggedin == false) {

      this.navCtrl.push(LoginPage);

    }
    else {


    }




  }
  ionViewDidEnter() {


    if (this.auth.loggedin == true) {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      this.data_service.get_accountsummary().subscribe((v) => {
        this.Accountsummary = v;
        console.log(v);
loader.dismiss();
      });

    } else {
      this.navCtrl.push(LoginPage);

    }

  }

  converttimestamp(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();

  }

}
