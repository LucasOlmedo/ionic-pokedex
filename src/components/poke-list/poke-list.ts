import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { HttpParams } from '@angular/common/http';

/**
 * Generated class for the PokeListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'poke-list',
  templateUrl: 'poke-list.html'
})
export class PokeListComponent {

  @Input() pokeList: any;

  constructor(
    public navCtrl: NavController,
  ) {  }

  getDetails(pokeUrl) {
    this.navCtrl.push("DetailsPage", {
      pokeUrl: pokeUrl
    });
  }
}
