import { HeroSuperpowersEnum } from "src/enums/heroes/superpowers.enum";
import { HeroDocument } from "../schemas/hero.schema";

export class HeroDetailsDTO {
  nickname: string;
  realName: string;
  originDescription: string;
  superPowers: HeroSuperpowersEnum[];
  catchPhrase: string;
  images: string[];
}

export function toHeroDetailsDTO(hero: HeroDocument): HeroDetailsDTO {
  return {
    nickname: hero.nickname,
    realName: hero.realName,
    originDescription: hero.originDescription,
    superPowers: hero.superPowers,
    catchPhrase: hero.catchPhrase,
    images: hero.images,
  };
}
