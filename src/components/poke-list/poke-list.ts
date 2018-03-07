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

  typeColor(type) {
    switch (type) {
      case 'normal':
        return 'type-normal';
      case 'fire':
        return 'type-fire';
      case 'water':
        return 'type-water';
      case 'electric':
        return 'type-electric';
      case 'grass':
        return 'type-grass';
      case 'ice':
        return 'type-ice';
      case 'fighting':
        return 'type-fighting';
      case 'poison':
        return 'type-poison';
      case 'ground':
        return 'type-ground';
      case 'flying':
       return 'type-flying';
      case 'psychic':
       return 'type-psychic';
      case 'bug':
       return 'type-bug';
      case 'rock':
       return 'type-rock';
      case 'ghost':
       return 'type-ghost';
      case 'dragon':
       return 'type-dragon';
      case 'dark':
       return 'type-dark';
      case 'steel':
       return 'type-steel';
      case 'fairy':
       return 'type-fairy';
      default:
        break;
    }
  }
}
