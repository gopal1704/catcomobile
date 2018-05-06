import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { DataProvider } from '../../providers/data/data';



@IonicPage()
@Component({
  selector: 'page-myreferrals',
  templateUrl: 'myreferrals.html',
})
export class MyreferralsPage {

  public Referrals : any;
  constructor(
    public loadingCtrl : LoadingController,
    public data_service : DataProvider,
    public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyreferralsPage');
  }
  converttimestamp(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();

  }

  ionViewDidEnter() {
  

      let loader = this.loadingCtrl.create({
        content: " please wait...",
      });
      loader.present();

      this.data_service.  get_referrals().subscribe((d)=>{

        this.Referrals = d;
        console.log(this.Referrals);
loader.dismiss();
      });

    
  }

}
