import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import{DataProvider} from '../../providers/data/data';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  public Transactions;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data_service : DataProvider,public loadingCtrl :LoadingController) {

    let loader = this.loadingCtrl.create({
      content: " please wait...",
    });
    loader.present();
     this.data_service.get_transactions().subscribe((v)=>{
      loader.dismiss();
      this.Transactions= v;
      console.log(v);
    });

    
  }
  converttimestamp(ts){
    var d = new Date(ts);
    return d.toLocaleDateString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
    
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');



  }

  

}
