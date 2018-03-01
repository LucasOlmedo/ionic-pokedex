import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PokeServiceProvider } from './../../providers/poke-service/poke-service';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  public pokeUrl;
  public obj: any;
  public poke: any;
  public loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pokeService: PokeServiceProvider
  ) {
    this.pokeUrl = navParams.get('pokeUrl');
    this.pokeService.showLoading();
    this.pokeService.loadAPIResource(this.pokeUrl)
      .subscribe(response => {
        this.obj = response;
        this.poke = {
          id: this.obj.id,
          name: this.obj.name,
          weight: this.obj.weight,
          height: this.obj.height,
          img: this.obj.sprites.front_default,
          types: this.obj.types.reverse(),
          formatted: {
            title: `#${this.obj.id} - ${this.obj.name}`,
            name: `${this.obj.name}`,
            height: `${this.formatHeightWeight(this.obj.height)} m`,
            weight: `${this.formatHeightWeight(this.obj.weight)} Kg`,
          }
        };
        this.loadPokeDescription(this.obj.species.url);
      },
      error => console.error(error),
      () => {
        this.pokeService.hideLoading();
      });
  }

  loadPokeDescription(speciesUrl){
    var species: any;
    this.pokeService.loadAPIResource(speciesUrl)
      .subscribe(response => {
        species = response;
        let flavorTextEntries = species.flavor_text_entries;
        let gameVersion = flavorTextEntries.filter((item) => {
          return item.version.name == 'firered';
        });
        let englishText = gameVersion.filter((version) => {
          return version.language.name == 'en';
        });
        this.poke.formatted.description = `${englishText[0].flavor_text.toString()}`;
      },
      error => console.error(error));
  }

  ionViewDidLoad() {

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
