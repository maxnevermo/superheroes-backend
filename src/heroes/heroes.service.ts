import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Hero, HeroDocument } from "./schemas/hero.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class HeroesService {
  constructor(
    @InjectModel(Hero.name)
    private readonly heroModel: Model<HeroDocument>,
  ) {}
}
