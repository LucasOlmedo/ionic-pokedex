import { LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the PokeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PokeServiceProvider {

  private loader: any;

  constructor(
    public http: HttpClient,
    public loading: LoadingController
  ) {
  }

  loadAPIResource(url, search?: HttpParams) {
    return this.http.get(url, {
      params: search
    })
  }

  showLoading() {
    this.loader = this.loading.create({
      spinner: "crescent",
      showBackdrop: true,
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

}
