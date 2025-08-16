import { Module } from "@nestjs/common";
import { HeroesController } from "./heroes.controller";
import { HeroesService } from "./heroes.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Hero, HeroSchema } from "./schemas/hero.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }]),
  ],
  controllers: [HeroesController],
  providers: [HeroesService],
  exports: [HeroesService],
})
export class HeroesModule {}
