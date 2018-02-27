import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the PokeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PokeServiceProvider {

  public data: any;

  constructor(public http: HttpClient) {
    console.log('Hello PokeServiceProvider Provider');
  }

  load(url) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(url)
        .subscribe((response: Response) => {
          this.data = response;
          resolve(this.data);
        });
    });
  }

  getDetails(pokeUrl) {
    return new Promise(resolve => {
      this.http.get(pokeUrl)
        .subscribe((response: Response) => {
          this.data = response;
          resolve(this.data);
        });
    })
  }

}
