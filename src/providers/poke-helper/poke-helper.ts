import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Vibrant from 'node-vibrant';

@Injectable()
export class PokeHelperProvider {

  constructor(public http: HttpClient) {

  }

  getAverageColor(sprite) {
    let img = sprite;
    var imgVibrant = Vibrant.from(img);
    let prominentColors = [];

    return imgVibrant
      .quality(0)
      .maxColorCount(2)
      .getPalette()
      .then(palette => {
        if (palette.DarkMuted != null) {
          let vibrant = {
            name: 'DarkMuted',
            hex: palette.DarkMuted.getHex(),
            population: palette.DarkMuted.getPopulation(),
            bodyText: palette.DarkMuted.getBodyTextColor(),
            titleText: palette.DarkMuted.getTitleTextColor()
          };
          prominentColors.push(vibrant)
        }

        if (palette.DarkVibrant != null) {
          let vibrant = {
            name: 'DarkVibrant',
            hex: palette.DarkVibrant.getHex(),
            population: palette.DarkVibrant.getPopulation(),
            bodyText: palette.DarkVibrant.getBodyTextColor(),
            titleText: palette.DarkVibrant.getTitleTextColor()
          };
          prominentColors.push(vibrant)
        }

        if (palette.LightMuted != null) {
          let vibrant = {
            name: 'LightMuted',
            hex: palette.LightMuted.getHex(),
            population: palette.LightMuted.getPopulation(),
            bodyText: palette.LightMuted.getBodyTextColor(),
            titleText: palette.LightMuted.getTitleTextColor()
          };
          prominentColors.push(vibrant)
        }

        if (palette.LightVibrant != null) {
          let vibrant = {
            name: 'LightVibrant',
            hex: palette.LightVibrant.getHex(),
            population: palette.LightVibrant.getPopulation(),
            bodyText: palette.LightVibrant.getBodyTextColor(),
            titleText: palette.LightVibrant.getTitleTextColor()
          };
          prominentColors.push(vibrant)
        }

        if (palette.Muted != null) {
          let vibrant = {
            name: 'Muted',
            hex: palette.Muted.getHex(),
            population: palette.Muted.getPopulation(),
            bodyText: palette.Muted.getBodyTextColor(),
            titleText: palette.Muted.getTitleTextColor()
          };
          prominentColors.push(vibrant)
        }

        if (palette.Vibrant != null) {
          let vibrant = {
            name: 'Vibrant',
            hex: palette.Vibrant.getHex(),
            population: palette.Vibrant.getPopulation(),
            bodyText: palette.Vibrant.getBodyTextColor(),
            titleText: palette.Vibrant.getTitleTextColor()
          };
          prominentColors.push(vibrant)
        }

        let max = this.getProminentPopulationColor(prominentColors);
        return max;
      });
  }

  getProminentPopulationColor(colors) {
    let max = colors[0];
    for (let index = 1; index < colors.length; index++) {
      let color = colors[index];
      max = (color.population > max.population) ? color : max;
    }
    return max;
  }

  getGameVersionColor(version) {
    switch (version) {
      case 'red':
        return 'version-red';
      case 'blue':
        return 'version-blue';
      case 'yellow':
        return 'version-yellow';
      case 'gold':
        return 'version-gold';
      case 'silver':
        return 'version-silver';
      case 'crystal':
        return 'version-crystal';
      case 'ruby':
        return 'version-ruby';
      case 'sapphire':
        return 'version-sapphire';
      case 'emerald':
        return 'version-emerald';
      case 'firered':
        return 'version-firered';
      case 'leafgreen':
        return 'version-leafgreen';
      case 'diamond':
        return 'version-diamond';
      case 'pearl':
        return 'version-pearl';
      case 'platinum':
        return 'version-platinum';
      case 'heartgold':
        return 'version-heartgold';
      case 'soulsilver':
        return 'version-soulsilver';
      case 'black':
        return 'version-black';
      case 'white':
        return 'version-white';
      case 'colosseum':
        return 'version-colosseum';
      case 'xd':
        return 'version-xd';
      case 'black-2':
        return 'version-black-2';
      case 'white-2':
        return 'version-white-2';
      case 'x':
        return 'version-x';
      case 'y':
        return 'version-y';
      case 'omega-ruby':
        return 'version-omega-ruby';
      case 'alpha-sapphire':
        return 'version-alpha-sapphire';
      case 'sun':
        return 'version-sun';
      case 'moon':
        return 'version-moon';
      default:
        break;
    }
  }

  getStatColor(stat) {
    switch (stat) {
      case 'hp':
        return 'stat-hp';
      case 'attack':
        return 'stat-attack';
      case 'defense':
        return 'stat-defense';
      case 'special-attack':
        return 'stat-special-attack';
      case 'special-defense':
        return 'stat-special-defense';
      case 'speed':
        return 'stat-speed';
      default:
        break;
    }
  }

  getTypeColor(type) {
    switch (type) {
      case 'normal':
        return 'type-normal';
      case 'fire':
        return 'type-fire';
      case 'water':
        return 'type-water';
      case 'electric':
        return 'type-electric';
      case 'grass':
        return 'type-grass';
      case 'ice':
        return 'type-ice';
      case 'fighting':
        return 'type-fighting';
      case 'poison':
        return 'type-poison';
      case 'ground':
        return 'type-ground';
      case 'flying':
        return 'type-flying';
      case 'psychic':
        return 'type-psychic';
      case 'bug':
        return 'type-bug';
      case 'rock':
        return 'type-rock';
      case 'ghost':
        return 'type-ghost';
      case 'dragon':
        return 'type-dragon';
      case 'dark':
        return 'type-dark';
      case 'steel':
        return 'type-steel';
      case 'fairy':
        return 'type-fairy';
      default:
        break;
    }
  }

  getDamageClassColor(damageClass) {
    switch (damageClass) {
      case 'status':
        return 'damage-class-status';
      case 'special':
        return 'damage-class-special';
      case 'physical':
        return 'damage-class-physical';
      default:
        break;
    }
  }

  getLearnMethodColor(learnMethod) {
    switch (learnMethod) {
      case 'tutor':
        return 'river';
      case 'machine':
        return 'sunny';
      case 'level-up':
        return 'mountain';
      default:
        break;
    }
  }

  formatId(id) {
    if (id < 10) {
      return '00' + id;
    }
    if (id >= 10 && id < 100) {
      return '0' + id;
    }
    return id;
  }

  filterMoveList(keys, moveList) {
    return moveList.filter(move => {
      let learnMethod: any = this.formatUniqueLearnMethod(move);
      return keys.every(kw => learnMethod.some(
        learn => learn.move_learn_method.name === kw 
      ));
    });
  }

  formatUniqueLearnMethod(move) {
    let seen = new Set;
    let unique = [];
    for (let value of move.version_group_details) {
      if (seen.has(value.move_learn_method.name)) {
        continue;
      } else {
        unique.push(value);
        seen.add(value.move_learn_method.name);
      }
    }

    return unique;
  }

}