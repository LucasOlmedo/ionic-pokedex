import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PokeServiceProvider } from './../../providers/poke-service/poke-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('spinner') spinner: any;

  public obj: any;
  public pokeList: any;
  public controls: any;
  public url: string = 'https://pokeapi.co/api/v2/';
  public hasMoreData: boolean = true;
  public pageLoaded: boolean = false;

  constructor(
    public pokeService: PokeServiceProvider
  ) {
    this.getPokes(this.url + 'pokemon/');
  }

  getPokes(url) {
    this.pokeService.loadAPIResource(url)
      .subscribe(response => {
        this.obj = response;
        this.pokeList = this.obj;
        this.controls = {
          count: this.obj.count,
          next: this.obj.next,
          previous: this.obj.previous
        }
      },
        error => console.error(error),
        () => {
          let spinnerNative = this.spinner._elementRef.nativeElement;
          spinnerNative.style.display = 'none';
          this.pageLoaded = true;
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
            this.pokeList.results.push(this.obj.results[index]);
          }
        },
          error => console.log(error),
          () => {
            scroll.complete();
          });
    }, 500);
  }
}
