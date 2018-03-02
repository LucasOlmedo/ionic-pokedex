import { Component, Input } from '@angular/core';

/**
 * Generated class for the PokeDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'poke-details',
  templateUrl: 'poke-details.html',
})
export class PokeDetailsComponent {

  @Input() pokeDetails: any;

  constructor() { }

  ionViewDidLoad() { }

  formatHeightWeight(value) {
    let formatted = value.toString();
    let last = formatted.slice(-1);
    let lastIndex = formatted.lastIndexOf(last);

    if(formatted.length > 1){
      return formatted.substr(0, lastIndex) + `.${last}`;
    }else{
      return formatted.substr(0, lastIndex) + `0.${last}`;
    }
  }

  statColor(stat) {
    switch (stat) {
      case 'hp':
        return 'stat-hp';
      case 'attack':
        return 'stat-attack';
      case 'defense':
        return 'stat-defense';
      case 'special-attack':
        return 'stat-special-attack';
      case 'special-defense':
        return 'stat-special-defense';
      case 'speed':
        return 'stat-speed';
      default:
        break;
    }
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
