import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-placebuyorder',
  templateUrl: 'placebuyorder.html',
})
export class PlacebuyorderPage {
  public amount: number = 0;
  public paymentmethod: string = "";
  constructor(public auth: AuthProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  pay() {
    if (this.amount > 500) {

      if (this.amount < this.auth.user_summary.walletbalance) {

      } else {

      }

    } else {

      let alert = this.alertCtrl.create({
        title: 'error!',
        subTitle: 'Minimum amount $500',
        buttons: ['OK']
      });
      alert.present();
    }

  }


}


