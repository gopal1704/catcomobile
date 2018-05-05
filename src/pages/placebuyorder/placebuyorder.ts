import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { BitcoinpaymentPage } from '../bitcoinpayment/bitcoinpayment';

@IonicPage()
@Component({
  selector: 'page-placebuyorder',
  templateUrl: 'placebuyorder.html',
})
export class PlacebuyorderPage {
  public amount: number = 0;
  public paymentmethod: string = "";
  constructor(public data_service :DataProvider,public auth: AuthProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  pay() {

    if (this.amount && this.paymentmethod != "" && this.paymentmethod) {
      if (this.amount >= 500) {

        if (this.amount < this.auth.user_summary.walletbalance) {

          if (this.paymentmethod==="wallet") {

           this.data_service.create_investmentwallet('SC01',this.amount);
           console.log("ii");
           let alert = this.alertCtrl.create({
            title: 'success!',
            subTitle: ' Wallet payment successful',
            buttons: ['OK']
          });
          alert.present();
          this.amount=0;
          this.paymentmethod="";




          }
          if(this.paymentmethod==="bitcoin"){
            this.data_service.investment_amount = this.amount;
            this.navCtrl.push(BitcoinpaymentPage);
          }




        } else {
          let alert = this.alertCtrl.create({
            title: 'error!',
            subTitle: 'Insufficient funds',
            buttons: ['OK']
          });
          alert.present();


        }

      } else {

        let alert = this.alertCtrl.create({
          title: 'error!',
          subTitle: 'Minimum amount $500',
          buttons: ['OK']
        });
        alert.present();
      }

    } else {
      let alert = this.alertCtrl.create({
        title: 'error!',
        subTitle: 'please enter all the details',
        buttons: ['OK']
      });
      alert.present();
    }

  }


}


