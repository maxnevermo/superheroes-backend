import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { HeroesService } from "./heroes.service";
import { HeroCardDTO } from "./dto/hero-card.dto";
import { HeroDetailsDTO } from "./dto/hero-details.dto";

const imageMemoryMulter: multer.Options = {
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const isImage = /^image\//.test(file.mimetype);
    if (!isImage) {
      new multer.MulterError("LIMIT_UNEXPECTED_FILE");
    }
    cb(null, true);
  },
};

function parseJson<T>(raw: string, message = "Invalid JSON"): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new BadRequestException(message);
  }
}

@Controller("heroes")
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  getHeroes(): Promise<HeroCardDTO[]> {
    return this.heroesService.getAllHeroes();
  }

  @Post()
  @UseInterceptors(FilesInterceptor("photos", 5, imageMemoryMulter))
  addHero(
    @Body("payload") payload: string,
    @UploadedFiles() photos: Express.Multer.File[],
  ): Promise<HeroCardDTO> {
    const data = parseJson<Omit<HeroDetailsDTO, "images">>(payload);

    return this.heroesService.addHero(data, photos);
  }

  @Put(":id")
  @UseInterceptors(FilesInterceptor("photos", 5, imageMemoryMulter))
  editHero(
    @Param("id") id: string,
    @Body("payload") payload: string,
    @Body("keepPublicIds") keepPublicIds?: string,
    @UploadedFiles() photos?: Express.Multer.File[],
  ): Promise<HeroDetailsDTO> {
    const data = parseJson<Omit<HeroDetailsDTO, "images">>(payload);
    const keep = keepPublicIds ? parseJson<string[]>(keepPublicIds) : [];

    return this.heroesService.editHero(id, data, photos ?? [], keep);
  }

  @Delete(":id")
  deleteHero(@Param("id") id: string): Promise<HeroCardDTO[]> {
    return this.heroesService.deleteHero(id);
  }
}
