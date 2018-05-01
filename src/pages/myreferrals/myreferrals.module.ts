import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyreferralsPage } from './myreferrals';

@NgModule({
  declarations: [
    MyreferralsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyreferralsPage),
  ],
})
export class MyreferralsPageModule {}
