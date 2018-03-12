import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PokeServiceProvider } from '../providers/poke-service/poke-service';
import { PokeListComponent } from '../components/poke-list/poke-list';
import { PokeHelperProvider } from '../providers/poke-helper/poke-helper';
import { PokeListItemComponent } from '../components/poke-list-item/poke-list-item';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PokeListComponent,
    PokeListItemComponent,
    // Network
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    // Network
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PokeServiceProvider,
    PokeHelperProvider,
    Network
  ]
})
export class AppModule {}
