import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PokeServiceProvider } from '../../providers/poke-service/poke-service';
import { PokeHelperProvider } from '../../providers/poke-helper/poke-helper';

@IonicPage()
@Component({
  selector: 'page-move-details',
  templateUrl: 'move-details.html',
})
export class MoveDetailsPage {

  @ViewChild('spinner') spinner: any;
  public move: any;
  public moveDetails: any;
  public modalLoaded: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public pokeService: PokeServiceProvider,
    public helper: PokeHelperProvider
  ) {
    this.move = this.navParams.get('move');
  }

  ionViewWillLoad() {
    this.getMove(this.move.move.url)
  }

  getMove(moveUrl){
    this.pokeService.loadAPIResource(moveUrl)
      .subscribe(response => {
        this.moveDetails = response;
        console.log(this.moveDetails)
      },
      error => console.error(error),
      () => {
          let spinnerNative = this.spinner._elementRef.nativeElement;
          spinnerNative.style.display = 'none';
          this.modalLoaded = true;
      });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  formatName(name) {
    return name.toString().replace('-', ' ');
  }

  typeColor(type) {
    return this.helper.getTypeColor(type);
  }

  damageClassColor(damageClass) {
    return this.helper.getDamageClassColor(damageClass);
  }
}
