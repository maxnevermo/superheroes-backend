import { Controller, Get } from "@nestjs/common";
import { HeroesService } from "./heroes.service";
import { HeroCardDTO } from "./dto/hero-card.dto";

@Controller("heroes")
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  @Get()
  async getHeroes(): Promise<HeroCardDTO[]> {
    return this.heroesService.getAllHeroes();
  }
}
