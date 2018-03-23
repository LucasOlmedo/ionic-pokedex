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
  public learnMethod: any;
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
    this.learnMethod = this.navParams.get('moveLearnMethods');
  }

  ionViewWillLoad() {
    this.getMove(this.move.move.url)
  }

  getMove(moveUrl){
    this.pokeService.loadAPIResource(moveUrl)
      .subscribe(response => {
        let mv: any = response;
        this.moveDetails = {
          name: mv.name,
          type: mv.type,
          damage_class: mv.damage_class,
          accuracy: mv.accuracy,
          power: mv.power,
          pp: mv.pp,
          effect_entries: mv.effect_entries,
          effect_chance: mv.effect_chance,
          learn_method: this.learnMethod
        };
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

  formatEffectDescription(description) {
    let desc = description;
    return desc.replace(/\$effect_chance/gi, this.moveDetails.effect_chance);
  }

  typeColor(type) {
    return this.helper.getTypeColor(type);
  }

  damageClassColor(damageClass) {
    return this.helper.getDamageClassColor(damageClass);
  }
}
