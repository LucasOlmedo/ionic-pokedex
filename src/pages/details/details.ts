import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PokeServiceProvider } from './../../providers/poke-service/poke-service';
import { PokeHelperProvider } from '../../providers/poke-helper/poke-helper';
import { Network } from '@ionic-native/network';

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
  public pageLoaded: boolean = false;
  public pokeColor: any;
  public httpError: boolean = false;
  public httpErrorMessage: string = '';
  public mainErrorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pokeService: PokeServiceProvider,
    public helper: PokeHelperProvider,
    private network: Network,
    public toast: ToastController
  ) {
    if(network.type != 'none'){
      this.pokeUrl = navParams.get('pokeUrl');
      this.pokeColor = navParams.get('pokeColor');
      this.pokeService.loadAPIResource(this.pokeUrl)
        .subscribe(response => {
          this.obj = response;
          this.pokeDetails = {
            id: helper.formatId(this.obj.id),
            name: this.obj.name,
            weight: this.obj.weight,
            height: this.obj.height,
            img: this.obj.sprites.front_default,
            types: this.obj.types.reverse(),
            stats: this.obj.stats.reverse(),
          };
          this.loadPokeDescription(this.obj.species.url);
        },
          error => {
            let spinnerNative = this.spinner._elementRef.nativeElement;
            spinnerNative.style.display = 'none';
            let refreshButton: any = document.getElementById('refreshButton');
            refreshButton.style.display = 'block';
            this.httpErrorMessage = error.message;
            this.mainErrorMessage = 'Server is Down';
            this.httpError = true;
          });
    }else{
      let disconnectToast = this.toast.create({
        message: 'You are offline',
        position: 'bottom',
      });
      disconnectToast.present();
    }
  }

  ionViewDidLoad() {
    let element = document.getElementById('navDetails');
    let navbar: any = element.getElementsByClassName('toolbar-background')[0];
    let backButton: any = document.querySelector('#navDetails > button > span > ion-icon');
    let detailsTitle: any = document.querySelector('#navDetails > div.toolbar-content.toolbar-content-md > ion-title > div');
    navbar.style.backgroundColor = this.pokeColor.hex;
    backButton.style.color = this.pokeColor.titleText;
    detailsTitle.style.color = this.pokeColor.titleText;
  }

  loadPokeDescription(speciesUrl) {
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
            class: item.version.name,
            game_version: item.version.name.toString().replace("-", " "),
            description: item.flavor_text
          };
        });
        this.pokeDetails.dex = englishTextGroup;
        return this.pokeDetails;
      },
        error => {
          let spinnerNative = this.spinner._elementRef.nativeElement;
          spinnerNative.style.display = 'none';
          let refreshButton: any = document.getElementById('refreshButton');
          refreshButton.style.display = 'block';
          this.httpErrorMessage = error.message;
          this.mainErrorMessage = 'Server is Down';
          this.httpError = true;
        },
        () => {
          let spinnerNative = this.spinner._elementRef.nativeElement;
          spinnerNative.style.display = 'none';
          this.pageLoaded = true;
        });
  }

  refreshPage() {
    this.navCtrl.popAll();
    this.navCtrl.push(DetailsPage);
  }
}
