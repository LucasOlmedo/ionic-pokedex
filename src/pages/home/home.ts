import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PokeServiceProvider } from './../../providers/poke-service/poke-service';
// import { Observable } from 'rxjs/Observable';
// import { from } from "rxjs/observable/from";
// import { map } from 'rxjs/operator/map';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/merge'
// import 'rxjs/add/observable/from'
import { Observable } from "rxjs/Rx";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('spinner') spinner: any;

  public obj: any;
  public pokeList: any[];
  public controls: any;
  public url: string = 'https://pokeapi.co/api/v2/';
  public hasMoreData: boolean = true;
  public pageLoaded: boolean = false;
  public extraInfoPoke: any;
  public singlePoke: any;

  constructor(
    public pokeService: PokeServiceProvider
  ) {
    
    this.pokeService.loadAPIResource(this.url + 'pokemon/')
      .subscribe((response: any) => {
        this.obj = response;
        this.controls = {
          count: this.obj.count,
          next: this.obj.next,
          previous: this.obj.previous
        };
        this.getDetails(this.obj).subscribe(data => {
          let spinnerNative = this.spinner._elementRef.nativeElement;
          spinnerNative.style.display = 'none';
          this.pageLoaded = true;
          this.pokeList = data.sort((a, b) => a.id - b.id);
        });
      });
  }

  getDetails(obj: any) {
    var pokes = obj.results;

    return Observable.from(pokes)
      .flatMap((item : any) => {
        return this.pokeService.loadAPIResource(item.url)
          .flatMap((pokeObj : any) => {
            return Observable.of({
              id: this.formatId(pokeObj.id),
              name: pokeObj.name,
              img: pokeObj.sprites.front_default,
              types: pokeObj.types,
              url: item.url
            });
          });
      })
      .toArray()
  }

  formatId(id) {
      if(id < 10) {
        return '00'+id;
      }
      if(id >= 10 && id < 100){
        return '0'+id;
      }
      return id;
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
          };
          this.getDetails(this.obj).subscribe(data => {
            for (let index = 0; index < data.length; index++) {
              let poke = data[index];
              this.pokeList.push(poke);
            }
            this.pokeList.sort((a, b) => a.id - b.id)
            scroll.complete();
          });
        });
    }, 500);
  }
}
