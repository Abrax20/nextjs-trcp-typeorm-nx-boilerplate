import { TablerIconsProps } from '@tabler/icons-react';

export enum NavigationMainPages {
  Dashboard = 'dashboard',
  Trips = 'trips',
  Settings = 'settings',
}

export enum NavigationSubPages {
  // Home
  Overview = 'overview',
  ExportData = 'export-data',
  UploadProviderCSV = 'upload-provider-csv',

  // Trips
  // Car
  EditCar = 'edit-car',
  CarOverview = 'car-overview',
  // Trip
  EditTrip = 'edit-trip',
  TripsOverview = 'trips-overview',
  // Employee
  EditEmployee = 'edit-employee',
  EmployeeOverview = 'employee-overview',
  // Location
  EditLocations = 'edit-location',
  LocationsOverview = 'locations-overview',

  // Settings
  Profile = 'profile',
  ApiKeys = 'api-keys',
  Organisation = 'organisation',
}

export type NavigationItemType = {
  id: NavigationMainPages;
  label: string;
  onClick: () => void;
  icon: (props: TablerIconsProps) => React.ReactNode;
  subItems: {
    label: string;
    onClick: () => void;
    id: NavigationSubPages;
    icon: (props: TablerIconsProps) => React.ReactNode;
  }[];
};
