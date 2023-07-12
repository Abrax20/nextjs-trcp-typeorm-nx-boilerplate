import { CarDTOType } from './car';
import { DriverDTOType, OrderStatusType, PlatformProviderType } from './driver';
import { CoordinatePointType } from './generic';

export type TripDTOType = {
  id: string;
  price: number;
  identifier: string;
  status: OrderStatusType;
  provider: PlatformProviderType;

  distance: number;
  submittedAt: number;

  receivedAt: number;
  receivedAddress: string;
  receivedPosition: CoordinatePointType;

  dropoffAt: number;
  dropoffAddress: string;
  dropoffPosition: CoordinatePointType;

  pickupAt: number;
  pickupAddress: string;
  pickupPosition: CoordinatePointType;

  createdAt: string;
  updatedAt: string;
} & Partial<{
  car: CarDTOType;
  driver: DriverDTOType;
  prevTrip: TripDTOType;
  nextTrip: TripDTOType;
}>;
