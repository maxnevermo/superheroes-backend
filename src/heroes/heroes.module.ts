import { Module } from "@nestjs/common";
import { HeroesController } from "./heroes.controller";
import { HeroesService } from "./heroes.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Hero, HeroSchema } from "./schemas/hero.schema";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }]),
    CloudinaryModule,
  ],
  controllers: [HeroesController],
  providers: [HeroesService],
  exports: [HeroesService],
})
export class HeroesModule {}
