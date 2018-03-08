import { NgModule } from '@angular/core';
import { PokeDetailsComponent } from './poke-details/poke-details';
import { PokeListComponent } from './poke-list/poke-list';
import { PokeListItemComponent } from './poke-list-item/poke-list-item';
@NgModule({
	declarations: [
		PokeDetailsComponent,
		PokeListComponent,
    PokeListItemComponent,
	],
	imports: [],
	exports: [
		PokeDetailsComponent,
		PokeListComponent,
    PokeListItemComponent,
	]
})
export class ComponentsModule { }
