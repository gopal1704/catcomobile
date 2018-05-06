import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';



@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  public withdrawalmethod: string = "";
  public amount: number = 0;
  public accountdetails: string = "";
  public bankname: string = "";
  public accountnumber: string = "";
  public ifsc: string = "";
  public moneypolo: string = "";
  public paypal: string = "";
  public bitcoin: string = "";


  constructor(public navCtrl: NavController,
    public toastCtrl : ToastController,
    public alertCtrl: AlertController, public auth: AuthProvider, public navParams: NavParams, public data_service: DataProvider) {
  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
  }
  send_request() {

    if (this.amount <= this.auth.user_summary.walletbalance) {


      var validate = false;
      if (this.withdrawalmethod == 'bank') {

        if (!(this.bankname == "") && !(this.ifsc == "") && !(this.accountnumber == "")) {
          validate = true;
        }
      }
      if (this.withdrawalmethod == 'paypal') {
        console.log(this.paypal);
        if (!(this.paypal == "")) {
          validate = true;
        }
      }
      if (this.withdrawalmethod == 'moneypolo') {

        if (!(this.moneypolo == "")) {
          validate = true;
        }
      }
      if (this.withdrawalmethod == 'bitcoin') {

        if (!(this.bitcoin == "")) {
          validate = true;
        }
      }
      if (validate == true) {


if(( this.auth.user_summary.approvalstatus=="approved")&&(this.auth.user_summary.transaction==true)){
        this.data_service.withdrawal_request({
          amount: this.amount,
          accounttype: this.withdrawalmethod,
          bankname: this.bankname,
          accountnumber: this.accountnumber,
          ifsc: this.ifsc,
          bitcoin: this.bitcoin,
          moneypolo: this.moneypolo,
          paypal: this.paypal



        });
       
        let toast = this.toastCtrl.create({
          message: 'Request sent successfully',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.amount=0;
        this.withdrawalmethod="";
    this.navCtrl.popToRoot();
       
      }
      else{
        if(this.auth.user_summary.transaction==false){
          let alert = this.alertCtrl.create({
            title: 'error!',
            subTitle: 'Please make initial investment to withdraw',
            buttons: ['OK']
          });
          alert.present();

        }
        if(this.auth.user_summary.approvalstatus!="approved"){

          let alert = this.alertCtrl.create({
            title: 'error!',
            subTitle: 'Approval pending cannot send withdraw request .',
            buttons: ['OK']
          });
          alert.present();
        }

      }
 
      }

      else {
        let alert = this.alertCtrl.create({
          title: 'error',
          subTitle: 'please enter all the details',
          buttons: ['Dismiss']
        });
        alert.present();
      }

    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Insufficient funds',
        subTitle: 'Please enter amount less than wallet balance',
        buttons: ['Dismiss']
      });
      alert.present();
    }


  }

}
