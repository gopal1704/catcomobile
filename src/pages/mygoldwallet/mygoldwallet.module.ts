import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MygoldwalletPage } from './mygoldwallet';

@NgModule({
  declarations: [
    MygoldwalletPage,
  ],
  imports: [
    IonicPageModule.forChild(MygoldwalletPage),
  ],
})
export class MygoldwalletPageModule {}
