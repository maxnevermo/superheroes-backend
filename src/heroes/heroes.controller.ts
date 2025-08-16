import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
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

  @Put()
  async editHero(
    @Body() changedHero: { id: string; hero: HeroDetailsDTO },
  ): Promise<HeroDetailsDTO> {
    return this.heroesService.editHero(changedHero);
  }

  @Delete(":id")
  async deleteHero(@Param("id") id: string): Promise<HeroCardDTO[]> {
    return this.heroesService.deleteHero(id);
  }
}
