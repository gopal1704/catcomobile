import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MygoldwalletPage } from '../pages/mygoldwallet/mygoldwallet';
import { MyreferralsPage } from '../pages/myreferrals/myreferrals';
import { LoginPage } from '../pages/login/login';
import { PlacebuyorderPage } from '../pages/placebuyorder/placebuyorder';
import { PlanPage } from '../pages/plan/plan';
import { ProfilePage } from '../pages/profile/profile';
import { TransactionsPage } from '../pages/transactions/transactions';
import { WallettransferPage } from '../pages/wallettransfer/wallettransfer';
import { WithdrawPage } from '../pages/withdraw/withdraw';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {HttpClientModule} from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { AuthProvider } from '../providers/auth/auth';
import { UploadproofPage } from '../pages/uploadproof/uploadproof';
var config = {
  apiKey: "AIzaSyDZctYRBSTRhuIjDsPP-j7ide7LrlHjf4o",
  authDomain: "investment-3327a.firebaseapp.com",
  databaseURL: "https://investment-3327a.firebaseio.com",
  projectId: "investment-3327a",
  storageBucket: "investment-3327a.appspot.com",
  messagingSenderId: "242794674827"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MygoldwalletPage,
    MyreferralsPage,
    LoginPage,
    PlacebuyorderPage,
    PlanPage,
    ProfilePage,
    TransactionsPage,
    WallettransferPage,
    WithdrawPage,
    UploadproofPage


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MygoldwalletPage,
    MyreferralsPage,
    LoginPage,
    PlacebuyorderPage,
    PlanPage,
    ProfilePage,
    TransactionsPage,
    WallettransferPage,
    WithdrawPage,
    UploadproofPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AuthProvider,
    
  ]
})
export class AppModule {}
