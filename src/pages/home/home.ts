import { HttpParams } from '@angular/common/http';
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
  public url = 'https://pokeapi.co/api/v2/';

  constructor(
    public navCtrl: NavController,
    public pokeService: PokeServiceProvider,
    public loadingController: LoadingController
  ) {
    this.getPokes(this.url + 'pokemon/');
  }

  getPokes(url) {
    this.showLoading();
    this.pokeService.loadAPIResource(url)
      .subscribe(response => {
        this.obj = response;
        this.pokes = this.obj.results;
        this.controls = {
          count: this.obj.count,
          previous: this.obj.previous,
          next: this.obj.next
        };
      },
      error => console.error(error),
      () => {
        this.hideLoading()
      });
  }

  getDetails(pokeUrl) {
    this.navCtrl.push("DetailsPage", {
      pokeUrl: pokeUrl
    });
  }

  doInfinite(scroll) {
    setTimeout(() => {
      let urlParams = new URL(this.controls.next).searchParams;
      let requestParams = new HttpParams()
        .set('limit', urlParams.get('limit'))
        .set('offset', urlParams.get('offset'));

      this.pokeService.loadAPIResource(this.url + 'pokemon/', requestParams)
        .subscribe(response => {
          this.obj = response;
          this.controls = {
            count: this.obj.count,
            previous: this.obj.previous,
            next: this.obj.next
          }

          for (let index = 0; index < this.obj.results.length; index++) {
            this.pokes.push(this.obj.results[index]);
          }
        },
        error => console.log(error),
        () => {
          scroll.complete();
        });

    }, 500);
  }

  showLoading() {
    this.loader = this.loadingController.create({
      spinner: "crescent",
      showBackdrop: true
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }
}
