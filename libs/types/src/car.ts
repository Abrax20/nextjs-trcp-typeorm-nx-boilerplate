import { LocationDTOType } from './location';

export type CarDTOType = {
  id: string;
  name: string;
  model: string;
  license: string;
  updatedAt: string;
  createdAt: string;
  identifier: string;
} & Partial<{
  baseLocation: LocationDTOType;
}>;
