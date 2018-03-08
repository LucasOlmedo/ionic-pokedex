import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PokeServiceProvider {

  constructor(public http: HttpClient) {

  }

  loadAPIResource(url, search?: HttpParams) {
    return this.http.get(url, {
      params: search
    })
  }
}
