import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PokeServiceProvider } from './../../providers/poke-service/poke-service';
import { Observable } from "rxjs/Rx";
import { PokeHelperProvider } from '../../providers/poke-helper/poke-helper';


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

  constructor(
    public pokeService: PokeServiceProvider,
    public helper: PokeHelperProvider
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
              id: this.helper.formatId(pokeObj.id),
              name: pokeObj.name,
              img: pokeObj.sprites.front_default,
              types: pokeObj.types.reverse(),
              url: item.url
            });
          });
      })
      .toArray()
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
