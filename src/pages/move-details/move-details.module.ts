import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoveDetailsPage } from './move-details';

@NgModule({
  declarations: [
    MoveDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MoveDetailsPage),
  ],
})
export class MoveDetailsPageModule {}
