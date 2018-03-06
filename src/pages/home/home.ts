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
  public pokeList: any = {
    results: []
  };
  public controls: any;
  public url: string = 'https://pokeapi.co/api/v2/';
  public hasMoreData: boolean = true;
  public pageLoaded: boolean = false;
  public extraInfoPoke: any;

  constructor(
    public pokeService: PokeServiceProvider
  ) {
    this.pokeService.loadAPIResource(this.url + 'pokemon/')
      .subscribe((response: Response) => {
        this.obj = response;
        this.controls = {
          count: this.obj.count,
          next: this.obj.next,
          previous: this.obj.previous
        };
        this.getDetails(this.obj);
        console.log('fim getdetails', this.pokeList);
        
      },
      error => console.error(error),
      () => {
        console.log('constructor fim do subscribe', this.pokeList);
        // let spinnerNative = this.spinner._elementRef.nativeElement;
        // spinnerNative.style.display = 'none';
        // this.pageLoaded = true;
      })
      console.log('fim geral', this.pokeList);
      
  }

  getDetails(obj: any) {
    var pokes = obj;
    
    for (let index = 0; index < pokes.results.length; index++) {
      let pokeObj = pokes.results[index];

      this.pokeService.loadAPIResource(pokeObj.url)
        .subscribe(response => {
          this.extraInfoPoke = response;

          let singlePoke = {
            id: this.extraInfoPoke.id,
            name: this.extraInfoPoke.name,
            url: pokeObj.url,
            img: this.extraInfoPoke.sprites.front_default,
            types: this.extraInfoPoke.types
          }
          
          this.pokeList.results.push(singlePoke);
        },
        error => console.error(error),
        () => {
          console.log('getdetails fim do subscribe', this.pokeList);
          
        });
    }
    console.log('fora do for', this.pokeList);
    
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
            // poke.id = this.getId(poke.url);
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
