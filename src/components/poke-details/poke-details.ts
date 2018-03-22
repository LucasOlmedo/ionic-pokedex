import { Component, Input, ViewChild } from '@angular/core';
import { NavController, Platform, ModalController, PopoverController, NavParams } from 'ionic-angular';
import { PokeHelperProvider } from '../../providers/poke-helper/poke-helper';
import { PokeServiceProvider } from '../../providers/poke-service/poke-service';
import { MoveDetailsPage } from '../../pages/move-details/move-details';
@Component({
  selector: 'poke-details',
  templateUrl: 'poke-details.html',
})
export class PokeDetailsComponent {

  @Input() pokeDetails: any;
  @ViewChild('pokeImgRef') pokeImg: any;
  @ViewChild('infoSegment') infoSegment: any;

  public pokeModule: string = "info";
  public pokemonAbility: any;

  constructor(
    public navCtrl: NavController,
    public helper: PokeHelperProvider,
    public platform: Platform,
    public pokeService: PokeServiceProvider,
    public modalMove: ModalController,
    public popover: PopoverController
  ) {

  }

  ngOnInit() {
    this.customSegmentByPlatform();
  }

  customSegmentByPlatform() {
    let segment: any = this.infoSegment.nativeElement;
    let element: any = document.getElementById('navDetails');
    let navbar: any = element.getElementsByClassName('toolbar-background')[0];

    if (this.platform.is('android')) {
      let nodes = segment.children;
      let documentStyleSheets: any = document.styleSheets;
      for (let index = 0; index < nodes.length; index++) {
        let element = nodes[index];
        element.style.color = navbar.style.backgroundColor;
      }
      for (let index = 0; index < documentStyleSheets.length; index++) {
        let sheet: any = documentStyleSheets[index];
        for (let aux = 0; aux < sheet.rules.length; aux++) {
          let rule = sheet.rules[aux];
          if (rule.selectorText == 'ion-segment-button.segment-activated') {
            sheet.removeRule(aux);
          }
        }
        if ("addRule" in sheet) {
          sheet.addRule("ion-segment-button.segment-activated", `border-color: ${navbar.style.backgroundColor} !important`, 1);
        } else if ("insertRule" in sheet) {
          sheet.insertRule(`ion-segment-button.segment-activated { border-color: ${navbar.style.backgroundColor} !important; }`, 1);
        }
      }
    }
    if (this.platform.is('ios')) {
      let nodes = segment.children;
      let documentStyleSheets: any = document.styleSheets;
      for (let index = 0; index < nodes.length; index++) {
        let element = nodes[index];
        element.style.borderColor = navbar.style.backgroundColor;
        element.style.color = navbar.style.backgroundColor;
        for (let index = 0; index < documentStyleSheets.length; index++) {
          let sheet: any = documentStyleSheets[index];
          for (let aux = 0; aux < sheet.rules.length; aux++) {
            let rule = sheet.rules[aux];
            if (rule.selectorText == 'ion-segment-button.segment-activated') {
              sheet.removeRule(aux);
            }
          }
          if ("addRule" in sheet) {
            sheet.addRule("ion-segment-button.segment-activated", `color: #fff !important; background: ${navbar.style.backgroundColor} !important`, 1);
          } else if ("insertRule" in sheet) {
            sheet.insertRule(`ion-segment-button.segment-activated { color: #fff !important; background: ${navbar.style.backgroundColor} !important; }`, 1);
          }
        }
      }
    }
    if (this.platform.is('windows')) {
      segment.style.justifyContent = 'space-evenly';
      let nodes = segment.children;
      for (let index = 0; index < nodes.length; index++) {
        let element = nodes[index];
        element.style.color = navbar.style.backgroundColor;
      }
    }
  }

  formatHeightWeight(value) {
    let formatted = value.toString();
    let last = formatted.slice(-1);
    let lastIndex = formatted.lastIndexOf(last);

    if (formatted.length > 1) {
      return formatted.substr(0, lastIndex) + `.${last}`;
    } else {
      return formatted.substr(0, lastIndex) + `0.${last}`;
    }
  }

  getTotalStats(stats) {
    return stats.reduce((a, b) => {
      return a + b.base_stat
    }, 0);
  }

  gameVersionColor(version) {
    return this.helper.getGameVersionColor(version);
  }

  statColor(stat) {
    return this.helper.getStatColor(stat);
  }

  typeColor(type) {
    return this.helper.getTypeColor(type);
  }

  showMove(item) {
    var moveDetails = this.modalMove.create('MoveDetailsPage', {
      move: item
    });
    moveDetails.present();
  }

  showAbiltyDetails(ability) {
    let popoverAbility = this.popover.create(PopoverAbilityPage, {
      abilityDetails: ability
    });
    popoverAbility.present();
  }
}

@Component({
  template: `
    <ion-spinner #spinner name="crescent" style="
      margin:auto;
      top:0;
      bottom:0;
      left:0;
      right:0;
      position:fixed;
    "></ion-spinner>

    <ion-grid *ngIf="pageLoaded">
      <ion-row>
        <ion-col text-center text-capitalize text-wrap>
          <h4>{{abilityDetails.name.replace('-', ' ')}}</h4>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-badge *ngIf="abilityDetails.hidden" color="secondary">
            <span>
              <ion-icon name="flash"> </ion-icon> HIDDEN
            </span>  
          </ion-badge>
          <p>{{abilityDetails.effect}}</p>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})
export class PopoverAbilityPage {
  @ViewChild('spinner') spinner: any;

  public abilityDetails: any;
  public param: any;
  public pageLoaded: boolean = false;

  constructor(
    private navParams: NavParams,
    private pokeService: PokeServiceProvider
  ) {
    this.param = this.navParams.data.abilityDetails;
    this.pokeService.loadAPIResource(this.param.ability.url)
      .subscribe(response => {
        let abl: any = response;
        this.abilityDetails = {
          name: abl.name,
          effect: abl.effect_entries[0].effect,
          hidden: this.param.is_hidden
        };
      },
        error => console.error(error),
        () => {
          let spinnerNative = this.spinner._elementRef.nativeElement;
          spinnerNative.style.display = 'none';
          this.pageLoaded = true;
        });

  }
}
