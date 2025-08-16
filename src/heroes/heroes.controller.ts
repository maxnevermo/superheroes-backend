import { Body, Controller, Get, Post } from "@nestjs/common";
import { HeroesService } from "./heroes.service";
import { HeroCardDTO } from "./dto/hero-card.dto";
import { HeroDetailsDTO } from "./dto/hero-details.dto";

@Controller("heroes")
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  @Get()
  async getHeroes(): Promise<HeroCardDTO[]> {
    return this.heroesService.getAllHeroes();
  }

  @Post()
  async addHero(@Body() hero: HeroDetailsDTO): Promise<HeroDetailsDTO> {
    return this.heroesService.addHero(hero);
  }
}
