import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-list',
  templateUrl: 'poke-list.html'
})
export class PokeListComponent {

  @Input() pokeList: any;

  constructor() {

  }
}
