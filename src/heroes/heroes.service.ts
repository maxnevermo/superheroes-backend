import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Hero, HeroDocument } from "./schemas/hero.schema";
import { InjectModel } from "@nestjs/mongoose";
import { HeroCardDTO, toHeroCardDTO } from "./dto/hero-card.dto";
import { HeroDetailsDTO } from "./dto/hero-details.dto";

@Injectable()
export class HeroesService {
  constructor(
    @InjectModel(Hero.name)
    private readonly heroModel: Model<HeroDocument>,
  ) {}

  async getAllHeroes(): Promise<HeroCardDTO[]> {
    const heroes = await this.heroModel.find();

    return heroes.map(toHeroCardDTO);
  }

  async addHero(hero: HeroDetailsDTO): Promise<HeroDetailsDTO> {
    return await this.heroModel.create(hero);
  }
}
