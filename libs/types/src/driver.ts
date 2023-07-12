export type DriverDTOType = {
  id: string;
  lastName: string;
  fullName: string;
  firstName: string;
  createdAt: string;
  updatedAt: string;
  identifier: string;
};

export enum OrderStatusType {
  Finished = 'finshed',
  Cancelled = 'cancelled',
  Unknown = 'unknown',
}

export enum PlatformProviderType {
  Bolt = 'Bolt',
  Uber = 'Uber',
}

export type RawDrivingEntry = {
  price: number;
  provider: PlatformProviderType;
  driver: {
    lastName: string;
    firstName: string;
  };
  car: {
    model: string;
    license: string;
  };
  distance: number;
  pickupAt: number;
  status: OrderStatusType;
  pickupLocation: string;
  orderReceivedAt: number;
  orderSubmittedAt: number;
  orderReceivingLocation: [number, number];
  dropoffAt: number;
  dropoffPosition: string;
};
