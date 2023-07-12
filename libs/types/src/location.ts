import { CoordinatePointType } from './generic';

export type LocationDTOType = {
  id: string;
  name: string;
  address: string;
  description: string;
  position: CoordinatePointType;

  createdAt: string;
  updatedAt: string;
};
