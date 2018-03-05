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
  public extraInfoPoke: any;

  constructor(
    public pokeService: PokeServiceProvider
  ) {
      // let spinnerNative = this.spinner._elementRef.nativeElement;
      // spinnerNative.style.display = 'none';
      // this.pageLoaded = true;
    this.pokeService.loadAPIResource(this.url + 'pokemon/')
      .subscribe((response: Response) => {
        this.obj = response;
        this.controls = {
          count: this.obj.count,
          next: this.obj.next,
          previous: this.obj.previous
        };
        this.pokeList = this.obj.results.map(poke => {
          this.getDetails(poke.url)
          poke = this.extraInfoPoke;
        });
      },
      error => console.error(error),
      () => {
        console.log(this.pokeList);
        let spinnerNative = this.spinner._elementRef.nativeElement;
        spinnerNative.style.display = 'none';
        this.pageLoaded = true;
      })
  }

  // getId(pokeUrl: any){
  //   let pokeId = pokeUrl.split("pokemon/").pop();
  //   return pokeId.replace('/', '');
  // }

  getDetails(pokeUrl: any) {
    this.pokeService.loadAPIResource(pokeUrl)
      .subscribe(singlePoke => {
        return this.extraInfoPoke = singlePoke;
      },
      error => console.error(error),
      )
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
            let poke = this.obj.results[index];
            poke.id = this.getId(poke.url);
            this.pokeList.results.push(poke);
          }
        },
          error => console.log(error),
          () => {
            scroll.complete();
          });
    }, 500);
  }
}
