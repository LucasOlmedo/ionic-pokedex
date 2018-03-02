import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
  @ViewChild('spinner') spinner: any;

  public pokeUrl;
  public obj: any;
  public pokeDetails: any;
  public loader: any;
  public pageLoaded: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pokeService: PokeServiceProvider,
  ) {
    this.pokeUrl = navParams.get('pokeUrl');
    this.pokeService.loadAPIResource(this.pokeUrl)
      .subscribe(response => {
        this.obj = response;
        this.pokeDetails = {
          id: this.obj.id,
          name: this.obj.name,
          weight: this.obj.weight,
          height: this.obj.height,
          img: this.obj.sprites.front_default.toString(),
          types: this.obj.types.reverse(),
          stats: this.obj.stats.reverse(),
        };
        this.loadPokeDescription(this.obj.species.url);
      },
      error => console.error(error));
  }

  loadPokeDescription(speciesUrl){
    var species: any;
    this.pokeService.loadAPIResource(speciesUrl)
      .subscribe(response => {
        species = response;
        let flavorTextEntries = species.flavor_text_entries;
        let englishText = flavorTextEntries.filter((version) => {
          return version.language.name == 'en';
        });
        let englishTextGroup = englishText.map((item) => {
          return {
            game_version: item.version.name.toString().replace("-", " "),
            description: item.flavor_text
          };
        });
        this.pokeDetails.dex = englishTextGroup;
        return this.pokeDetails;
      },
      error => console.error(error),
      () => {
        let spinnerNative = this.spinner._elementRef.nativeElement;
        spinnerNative.style.display = 'none';
        this.pageLoaded = true;
      });
  }

  ionViewDidLoad() {

  }
}
