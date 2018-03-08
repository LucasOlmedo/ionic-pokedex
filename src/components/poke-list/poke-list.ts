import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PokeHelperProvider } from '../../providers/poke-helper/poke-helper';

@Component({
  selector: 'poke-list',
  templateUrl: 'poke-list.html'
})
export class PokeListComponent {

  @Input() pokeList: any;

  constructor(
    public navCtrl: NavController,
    public helper: PokeHelperProvider
  ) {

  }

  getDetails(pokeUrl) {
    this.navCtrl.push("DetailsPage", {
      pokeUrl: pokeUrl
    });
  }

  typeColor(type) {
    return this.helper.getTypeColor(type);
  }
}
