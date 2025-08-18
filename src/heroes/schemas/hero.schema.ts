import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { HeroSuperpowersEnum } from "src/enums/heroes/superpowers.enum";

class HeroImage {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  publicId: string;
}

@Schema({ collection: "heroes" })
export class Hero {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  realName: string;

  @Prop({ required: true })
  originDescription: string;

  @Prop({ required: true, type: [String], enum: HeroSuperpowersEnum })
  superPowers: HeroSuperpowersEnum[];

  @Prop({ required: true })
  catchPhrase: string;

  @Prop({ required: true, type: [{ url: String, publicId: String }] })
  images: HeroImage[];
}

export type HeroDocument = HydratedDocument<Hero>;
export const HeroSchema = SchemaFactory.createForClass(Hero);
