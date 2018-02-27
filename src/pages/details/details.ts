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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pokeService: PokeServiceProvider
  ) {
    this.pokeUrl = navParams.get('pokeUrl');
    this.pokeService.getDetails(this.pokeUrl)
      .then((data: Response) => {
        this.obj = data;
        this.poke = {
          id: this.obj.id,
          name: this.obj.name,
          weight: this.obj.weight,
          height: this.obj.height
        }
      });
  }

  ionViewDidLoad() {
    console.log(this.poke);
  }

}
