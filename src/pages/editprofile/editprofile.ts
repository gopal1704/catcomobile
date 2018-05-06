import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{DataProvider} from '../../providers/data/data';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import {HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
 public  Profile: any;
 public CountryCodes: any;
 public CountryCodesList: any;
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl :LoadingController,
    public data_service : DataProvider,
    private http : HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
      this.Profile = {};
      this.CountryCodes = this.http.get('CC.json');

      this.CountryCodes.subscribe((v)=>{
        this.CountryCodesList = v;
        console.log(v)});


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  save(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.data_service.edit_profile(this.Profile).then(()=>{

loader.dismiss();
let alert = this.alertCtrl.create({
  title: 'Success!',
  subTitle: 'Profile updated successfully.',
  buttons: ['OK']
});
alert.present();


    }).catch((err)=>{ 

      loader.dismiss();
let alert = this.alertCtrl.create({
  title: 'Error!',
  subTitle: 'Profile update failed.',
  buttons: ['OK']
});
alert.present();
    })
  }
  onchangecountry(value){
    console.log(value);
    
    for(var i=0;i<this.CountryCodesList.length;i++){
      
    if(this.CountryCodesList[i].name === value){
      console.log(this.CountryCodesList[i].dial_code);
      this.Profile.isdcode = this.CountryCodesList[i].dial_code;
    }
    }
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
