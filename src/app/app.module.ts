import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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
    WithdrawPage


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    WithdrawPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
