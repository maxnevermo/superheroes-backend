import { HeroDocument } from "../schemas/hero.schema";

export class HeroCardDTO {
  mainImage: string;
  nickname: string;
}

export function toHeroCardDTO(hero: HeroDocument): HeroCardDTO {
  return {
    mainImage: hero.images[0],
    nickname: hero.nickname,
  };
}
