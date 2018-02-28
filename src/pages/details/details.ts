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
          types: this.obj.types,
          formatted: {
            title: `#${this.obj.id} - ${this.obj.name}`,
            name: `${this.obj.name}`,
            height: `${this.formatHeightWeight(this.obj.height)} m`,
            weight: `${this.formatHeightWeight(this.obj.weight)} Kg`,
          }
        };
      },
      error => console.error(error),
      () => {
        this.pokeService.hideLoading();
      });
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
    let pokemonType: any = type;
    let classColor: any;

    switch (pokemonType) {
      case 'normal':
        classColor = 'type-normal';
        break;

      case 'fire':
        classColor = 'type-fire';
        break;

      case 'water':
        classColor = 'type-water';
        break;

      case 'electric':
        classColor = 'type-electric';
        break;

      case 'grass':
        classColor = 'type-grass';
        break;

      case 'ice':
        classColor = 'type-ice';
        break;

      case 'fighting':
        classColor = 'type-fighting';
        break;

      case 'poison':
        classColor = 'type-poison';
        break;

      case 'ground':
        classColor = 'type-ground';
        break;

      case 'flying':
        classColor = 'type-flying';
        break;

      case 'psychic':
        classColor = 'type-psychic';
        break;

      case 'bug':
        classColor = 'type-bug';
        break;

      case 'rock':
        classColor = 'type-rock';
        break;

      case 'ghost':
        classColor = 'type-ghost';
        break;

      case 'dragon':
        classColor = 'type-dragon';
        break;

      case 'dark':
        classColor = 'type-dark';
        break;

      case 'steel':
        classColor = 'type-steel';
        break;

      case 'fairy':
        classColor = 'type-fairy';
        break;

      default:
        break;
    }

    console.log(classColor);
  }
}
