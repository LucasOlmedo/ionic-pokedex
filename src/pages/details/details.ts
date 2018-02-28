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
          formatted: {
            title: `#${this.obj.id} - ${this.obj.name}`,
            name: `Name: ${this.obj.name}`,
            height: `Height: ${this.obj.height}`,
            weight: `Weight: ${this.obj.weight}`,
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
}
