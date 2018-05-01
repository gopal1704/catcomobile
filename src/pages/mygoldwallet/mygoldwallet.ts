import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-mygoldwallet',
  templateUrl: 'mygoldwallet.html',
})
export class MygoldwalletPage {
public Investments : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public data_service :DataProvider,public loadingCtrl: LoadingController, 
  ) {
     
    let loader = this.loadingCtrl.create({
      content: " loading...",
    });
    loader.present();
    this.data_service.get_investments().subscribe((v)=>{
    loader.dismiss();
      this.Investments= v;
      console.log(v);
  }
)}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MygoldwalletPage');
  }

}
