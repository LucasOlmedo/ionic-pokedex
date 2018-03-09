import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PokeHelperProvider } from '../../providers/poke-helper/poke-helper';
@Component({
  selector: 'poke-details',
  templateUrl: 'poke-details.html',
})
export class PokeDetailsComponent {

  @Input() pokeDetails: any;
  @ViewChild('pokeImgRef') pokeImg: any;
  @ViewChild('main') main: any;

  public layoutStyle: any;

  constructor(
    public navCtrl: NavController,
    public helper: PokeHelperProvider
  ) {

  }
  
  ngAfterViewInit() {
    // this.helper.getAverageColor(this.pokeImg.nativeElement.src)
    //   .then(style => {
    //     var NavBar = document.getElementsByClassName('.toolbar-background-wp');
    //     console.log(NavBar)
    //   });
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

  getTotalStats(stats){
    return stats.reduce((a, b) => {
      return a + b.base_stat
    }, 0);
  }

  gameVersionColor(version) {
    return this.helper.getGameVersionColor(version);
  }

  statColor(stat) {
    return this.helper.getStatColor(stat);
  }

  typeColor(type) {
    return this.helper.getTypeColor(type);
  }
}
