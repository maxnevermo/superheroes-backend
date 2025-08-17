import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { Hero, HeroDocument } from "./schemas/hero.schema";
import { InjectModel } from "@nestjs/mongoose";
import { HeroCardDTO, toHeroCardDTO } from "./dto/hero-card.dto";
import { HeroDetailsDTO, toHeroDetailsDTO } from "./dto/hero-details.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class HeroesService {
  constructor(
    @InjectModel(Hero.name)
    private readonly heroModel: Model<HeroDocument>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async getAllHeroes(): Promise<HeroCardDTO[]> {
    const heroes = await this.heroModel.find();

    return heroes.map(toHeroCardDTO);
  }

  async addHero(
    hero: Omit<HeroDetailsDTO, "images">,
    photos: Express.Multer.File[],
  ): Promise<HeroCardDTO> {
    const uploaded = photos?.length
      ? await this.cloudinary.uploadMany(photos)
      : [];
    const images = uploaded.map((u) => ({
      url: u.secure_url,
      publicId: u.public_id,
    }));
    const created = await this.heroModel.create({ ...hero, images });

    return toHeroCardDTO(created);
  }

  async editHero(
    id: string,
    hero: Omit<HeroDetailsDTO, "images">,
    newPhotos: Express.Multer.File[],
    keepPublicIds: string[],
  ): Promise<HeroDetailsDTO> {
    const existing = await this.heroModel.findById(id);

    if (!existing) throw new NotFoundException("Hero not found");

    const current = existing.images ?? [];

    const toDelete = current
      .filter((img) => !keepPublicIds.includes(img.publicId))
      .map((img) => img.publicId);
    const uploaded = newPhotos?.length
      ? await this.cloudinary.uploadMany(newPhotos)
      : [];
    const newImages = uploaded.map((u) => ({
      url: u.secure_url,
      publicId: u.public_id,
    }));
    const keptImages = current.filter((img) =>
      keepPublicIds.includes(img.publicId),
    );
    const nextImages = [...keptImages, ...newImages];

    const updated = await this.heroModel.findByIdAndUpdate(
      id,
      { ...hero, images: nextImages },
      { new: true },
    );

    if (!updated) {
      await this.cloudinary.destroyMany(newImages.map((i) => i.publicId));
      throw new NotFoundException("Hero not found after update");
    }

    if (toDelete.length) await this.cloudinary.destroyMany(toDelete);

    return toHeroDetailsDTO(updated);
  }

  async deleteHero(id: string): Promise<HeroCardDTO[]> {
    const hero = await this.heroModel.findById(id);

    if (!hero) throw new NotFoundException("Hero not found");

    const publicIds = (hero.images ?? []).map((i) => i.publicId);
    await this.heroModel.deleteOne({ _id: id });

    if (publicIds.length) await this.cloudinary.destroyMany(publicIds);

    const modifiedHeroes = await this.heroModel.find();

    return modifiedHeroes.map(toHeroCardDTO);
  }
}
