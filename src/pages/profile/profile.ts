import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{DataProvider} from '../../providers/data/data';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { UploadproofPage } from '../uploadproof/uploadproof';
import { EditprofilePage } from '../editprofile/editprofile';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
public Profile : any;
  constructor(
    public loadingCtrl :LoadingController,
    public navCtrl: NavController, public navParams: NavParams,public data_service : DataProvider) {

    this.Profile = {};

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  gotoproofupload(){
    this.navCtrl.push(UploadproofPage);
  }
  converttimestampdob(ts){
    var d = new Date(ts);
   // return d.toLocaleString();
     return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    
    }

    editprofile(){
      this.navCtrl.push(EditprofilePage);
    }
  ionViewDidEnter() {

    let loader = this.loadingCtrl.create({
      content: " please wait...",
    });
    loader.present();
  this.data_service.get_profile().subscribe((v)=>{
  this.Profile=v;
  loader.dismiss();
  })
    
  }



}
