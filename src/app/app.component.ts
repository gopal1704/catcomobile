import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MygoldwalletPage } from '../pages/mygoldwallet/mygoldwallet';
import { PlacebuyorderPage } from '../pages/placebuyorder/placebuyorder';
import { MyreferralsPage } from '../pages/myreferrals/myreferrals';
import { TransactionsPage } from '../pages/transactions/transactions';
import { WallettransferPage } from '../pages/wallettransfer/wallettransfer';
import { WithdrawPage } from '../pages/withdraw/withdraw';
import { ProfilePage } from '../pages/profile/profile';
import { PlanPage } from '../pages/plan/plan';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string,icon: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home',component: HomePage },
      { title: 'My Gold Wallet',icon: 'home', component: MygoldwalletPage },
      { title: 'Place Buy Order',icon: 'home', component: PlacebuyorderPage },
      { title: 'My Referrals', icon: 'home',component: MyreferralsPage },
      { title: 'Transactions', icon: 'home',component: TransactionsPage },
      { title: 'Wallet Transfer',icon: 'home', component: WallettransferPage },
      { title: 'Withdraw',icon: 'home', component: WithdrawPage },
      { title: 'Profile',icon: 'ios-contact-outline', component: ProfilePage },
      { title: 'Buisness Plan',icon: 'home', component: PlanPage },
      { title: 'Login',icon: 'home', component: LoginPage },


    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
