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

  constructor(public http: HttpClient) {

  }

  loadAPIResource(url) {
    return this.http.get(url)
  }

}
