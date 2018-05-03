import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';



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
  constructor(    public afs: AngularFirestore,
    ,public navCtrl: NavController, public navParams: NavParams,public data_service : DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallettransferPage');
  }

  transfer(){

    this.data_service.transfer_to_wallet(this.amount,this.to_wallet)
  }

  onSearchChange(value : string){
    if(value && value!=""){
        //get name 
        var name =this.afs.doc<any>(`accountsummary/${value}`).valueChanges();
          
    name.subscribe((v)=>{
      if(v){
      this.Accountname = 'Transfer to : '+ v.name;
     this.accountstatus = true;
     this.ds.WalletTransferData.to_account = value;
     this.ds.WalletTransferData.to_name = v.name;
     console.log()
      if(this.amountstatus == true && this.accountstatus && this.ds.WalletTransferData.amount <=this.walletbalance ){
      this.proceed = true;
    }
    }
      else{  this.Accountname = 'Account does not exist';
      this.accountstatus = false;
      this.proceed = false;
    }
    }),err=>{
      this.Accountname = 'Account does not exist';
    }
    
    
    
    }
    else{
      this.proceed = false;
    }
      }



}
