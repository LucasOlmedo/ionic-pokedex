import { NgModule } from '@angular/core';
import { PokeDetailsComponent } from './poke-details/poke-details';
import { PokeListComponent } from './poke-list/poke-list';
@NgModule({
	declarations: [PokeDetailsComponent,
		PokeListComponent],
	imports: [],
	exports: [PokeDetailsComponent,
		PokeListComponent]
})
export class ComponentsModule { }
