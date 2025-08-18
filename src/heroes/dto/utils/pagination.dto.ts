import { HeroCardDTO } from "../hero-card.dto";

export type Paginated = {
  items: HeroCardDTO[];
  page: number;
  totalPages: number;
};
