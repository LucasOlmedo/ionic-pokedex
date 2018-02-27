import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { PokeServiceProvider } from './../../providers/poke-service/poke-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public obj: any;
  public pokes: any[];
  public controls: any;
  public loader: any;
  public urlAll = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    public navCtrl: NavController,
    public pokeService: PokeServiceProvider,
    public loadingController: LoadingController
  ) {
    this.getPokes(this.urlAll);
  }

  getPokes(url) {
    this.showLoading();
    this.pokeService.load(url)
      .then((data: Response) => {
          this.hideLoading();
          this.obj = data;
          this.pokes = this.obj.results;
          this.controls = {
            count: this.obj.count,
            previous: this.obj.previous,
            next: this.obj.next
          }
      });
  }

  getDetails(pokeUrl) {
    this.navCtrl.push("DetailsPage", {
      pokeUrl: pokeUrl
    })
  }

  showLoading() {
    this.loader = this.loadingController.create({
      spinner: "crescent",
      showBackdrop: true,
      dismissOnPageChange: true
    });
    this.loader.present();
  }

  hideLoading() {
    if(this.loader){
      this.loader.dismiss();
    }
  }
}
