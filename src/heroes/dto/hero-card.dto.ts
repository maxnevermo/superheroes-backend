import { HeroDocument } from "../schemas/hero.schema";

export class HeroCardDTO {
  id: string;
  mainImage: string;
  nickname: string;
}

export function toHeroCardDTO(hero: HeroDocument): HeroCardDTO {
  return {
    id: hero._id.toString(),
    mainImage: hero.images?.[0]?.url ?? "",
    nickname: hero.nickname,
  };
}
