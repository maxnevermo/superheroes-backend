import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { HeroSuperpowersEnum } from "src/enums/heroes/superpowers.enum";

@Schema({ collection: "heroes" })
export class Hero {
  @Prop({ required: true, type: String })
  nickname: string;

  @Prop({ required: true, type: String })
  realName: string;

  @Prop({ required: true, type: String })
  originDescription: string;

  @Prop({ required: true, type: [String], enum: HeroSuperpowersEnum })
  superPowers: HeroSuperpowersEnum[];

  @Prop({ required: true, type: String })
  catchPhrase: string;

  @Prop({ required: true, type: [String] })
  images: string[];
}

export type HeroDocument = HydratedDocument<Hero>;
export const HeroSchema = SchemaFactory.createForClass(Hero);
