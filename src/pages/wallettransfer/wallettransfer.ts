import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';



@IonicPage()
@Component({
  selector: 'page-wallettransfer',
  templateUrl: 'wallettransfer.html',
})
export class WallettransferPage {
  public amount : number = 0;
  public to_wallet : string ="";
public Accountname : string = "";
public accountstatus : boolean = false;
  constructor( public  alertCtrl: AlertController,  public auth :AuthProvider, public afs: AngularFirestore,
    public navCtrl: NavController, public navParams: NavParams,public data_service : DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallettransferPage');
  }

  transfer(){
    if(this.amount>this.auth.user_summary.walletbalance){
     
      let alert = this.alertCtrl.create({
        title: 'error!',
        subTitle: 'Insufficient funds',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.accountstatus==true){
////

let alertconfirm = this.alertCtrl.create({
  title: 'Confirmation',
  message: `Confirm wallet transfer to ${this.Accountname}`,
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      //  console.log('Cancel clicked');
      }
    },
    {
      text: 'Buy',
      handler: () => {
        
        this.data_service.transfer_to_wallet(this.amount,this.to_wallet);
        let alert = this.alertCtrl.create({
          title: 'success!',
          subTitle: 'Wallet transfer successful ',
          buttons: ['OK']
        });
        alert.present();
        this.amount = 0;
        this.to_wallet = "";
        this.accountstatus = false;
        

      }
    }
  ]
});
alertconfirm.present();




////

     
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'error!',
        subTitle: 'Account id dosent exists ',
        buttons: ['OK']
      });
      alert.present();
    }

  }

  onSearchChange(value : string){
    if(value && value!=""){
        //get name 
        var name =this.afs.doc<any>(`accountsummary/${value}`).valueChanges();
          
    name.subscribe((v)=>{
      if(v){
      this.Accountname = v.name;
     this.accountstatus = true;
     console.log()
   
    }
      else{  this.Accountname = 'Account does not exist';
      this.accountstatus = false;
    }
    }),err=>{
      this.Accountname = 'Account does not exist';
    }
    
    
    
    }
    else{
    }
      }



}
