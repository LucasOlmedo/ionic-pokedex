import { Component, Input, ElementRef } from '@angular/core';
@Component({
  selector: 'poke-details',
  templateUrl: 'poke-details.html',
})
export class PokeDetailsComponent {

  @Input() pokeDetails: any;

  public slided: boolean = false;

  constructor(
    public element: ElementRef
  ) {

  }

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

  getTotalStats(stats){
    return stats.reduce((a, b) => {
      return a + b.base_stat
    }, 0);
  }

  gameVersionColor(version) {
    switch (version) {
      case 'red':
        return 'version-red';
      case 'blue':
        return 'version-blue';
      case 'yellow':
        return 'version-yellow';
      case 'gold':
        return 'version-gold';
      case 'silver':
        return 'version-silver';
      case 'crystal':
        return 'version-crystal';
      case 'ruby':
        return 'version-ruby';
      case 'sapphire':
        return 'version-sapphire';
      case 'emerald':
        return 'version-emerald';
      case 'firered':
        return 'version-firered';
      case 'leafgreen':
        return 'version-leafgreen';
      case 'diamond':
        return 'version-diamond';
      case 'pearl':
        return 'version-pearl';
      case 'platinum':
        return 'version-platinum';
      case 'heartgold':
        return 'version-heartgold';
      case 'soulsilver':
        return 'version-soulsilver';
      case 'black':
        return 'version-black';
      case 'white':
        return 'version-white';
      case 'colosseum':
        return 'version-colosseum';
      case 'xd':
        return 'version-xd';
      case 'black-2':
        return 'version-black-2';
      case 'white-2':
        return 'version-white-2';
      case 'x':
        return 'version-x';
      case 'y':
        return 'version-y';
      case 'omega-ruby':
        return 'version-omega-ruby';
      case 'alpha-sapphire':
        return 'version-alpha-sapphire';
      case 'sun':
        return 'version-sun';
      case 'moon':
        return 'version-moon';
      default:
        break;
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
