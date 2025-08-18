import { HeroSuperpowersEnum } from "src/enums/heroes/superpowers.enum";
import { HeroDocument } from "../schemas/hero.schema";

export class HeroImageDTO {
  url: string;
  publicId: string;
}

export class HeroDetailsDTO {
  id: string;
  nickname: string;
  realName: string;
  originDescription: string;
  superPowers: HeroSuperpowersEnum[];
  catchPhrase: string;
  images: HeroImageDTO[];
}

export function toHeroDetailsDTO(hero: HeroDocument): HeroDetailsDTO {
  return {
    id: hero._id.toString(),
    nickname: hero.nickname,
    realName: hero.realName,
    originDescription: hero.originDescription,
    superPowers: hero.superPowers,
    catchPhrase: hero.catchPhrase,
    images: hero.images.map((img) => ({
      url: img.url,
      publicId: img.publicId,
    })),
  };
}
