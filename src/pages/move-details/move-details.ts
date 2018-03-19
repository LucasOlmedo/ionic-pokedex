import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PokeServiceProvider } from '../../providers/poke-service/poke-service';

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
    public pokeService: PokeServiceProvider
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
        console.log(this.moveDetails);
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
}
