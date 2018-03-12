import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PokeHelperProvider } from '../../providers/poke-helper/poke-helper';

@Component({
  selector: 'poke-list-item',
  templateUrl: 'poke-list-item.html'
})
export class PokeListItemComponent {

  @ViewChild('sprite') sprite: any;
  @ViewChild('cardItem') cardItem: any;
  @ViewChild('nameId') nameId: any;
  @Input() poke: any;

  public pokeColor: any;

  constructor(
    public navCtrl: NavController,
    public helper: PokeHelperProvider
  ) {

  }

  ngAfterViewInit() {
    this.helper.getAverageColor(this.sprite.nativeElement.src)
    .then(color => {
        this.cardItem.nativeElement.style.backgroundColor = `${color.hex}CC`;
        this.nameId.nativeElement.style.color = color.bodyText;
        this.pokeColor = color;
        let spinnerNative: any = document.getElementById('spinnerLoading');
        spinnerNative.style.display = 'none';
        this.cardItem.nativeElement.style.display = 'block';
      });
  }

  getDetails(pokeUrl) {
    this.navCtrl.push("DetailsPage", {
      pokeUrl: pokeUrl,
      pokeColor: this.pokeColor
    });
  }

  typeColor(type) {
    return this.helper.getTypeColor(type);
  }

}
