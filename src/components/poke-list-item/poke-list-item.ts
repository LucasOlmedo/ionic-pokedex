import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PokeHelperProvider } from '../../providers/poke-helper/poke-helper';

/**
 * Generated class for the PokeListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'poke-list-item',
  templateUrl: 'poke-list-item.html'
})
export class PokeListItemComponent {

  @ViewChild('sprite') sprite: any;
  @ViewChild('cardItem') cardItem: any;
  @Input() poke: any;

  constructor(
    public navCtrl: NavController,
    public helper: PokeHelperProvider
  ) {
    
  }

  ngAfterViewInit() {
    this.helper.getAverageColor(this.sprite.nativeElement.src)
      .then(hex => {
        this.cardItem.nativeElement.style.backgroundColor = hex;
      });
  }

  getDetails(pokeUrl) {
    this.navCtrl.push("DetailsPage", {
      pokeUrl: pokeUrl
    });
  }

  typeColor(type) {
    return this.helper.getTypeColor(type);
  }

}
