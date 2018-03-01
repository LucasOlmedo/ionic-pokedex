import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsPage } from './details';
import { PokeDetailsComponent } from '../../components/poke-details/poke-details';

@NgModule({
  declarations: [
    DetailsPage,
    PokeDetailsComponent
  ],
  imports: [
    IonicPageModule.forChild(DetailsPage)
  ],
})
export class DetailsPageModule {}
