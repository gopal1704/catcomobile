import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import 'firebase/storage'
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-uploadproof',
  templateUrl: 'uploadproof.html',
})
export class UploadproofPage {

  public proof : any;
  constructor( public auth :AuthProvider, public afAuth: AngularFireAuth,public alertCtrl : AlertController,public navCtrl: NavController, public navParams: NavParams, private camera : Camera) {
  
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadproofPage');
  }
  takepicture(){

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     
     this.proof  = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });

  }

  upload(){
    const ref = firebase.storage().ref();
    const file = this.proof;
    const task = ref.child(this.auth.user_id.toString()).putString(file,firebase.storage.StringFormat.DATA_URL);
    task.then((snapshot) => {
     let proofurl= snapshot.downloadURL;


      let alert = this.alertCtrl.create({
        title: 'success!',
        subTitle: 'proof upload successful!',
        buttons: ['OK']
      });
      alert.present();

  }).catch(()=>{
    let alert = this.alertCtrl.create({
      title: 'error!',
      subTitle: 'error occured during file upload!',
      buttons: ['OK']
    });
    alert.present();
  });



  }


}
