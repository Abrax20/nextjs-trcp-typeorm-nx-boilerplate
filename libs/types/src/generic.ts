export enum AuthenticationProviderTypes {
  None = 'none',
  Clerk = 'clerk',
}

export enum IntegrationProviderTypes {
  CSV = 'csv',
  None = 'none',
  Hubspot = 'hubspot',
  Pipedrive = 'pipedrive',
  Salesforce = 'salesforce',
}

export type CoordinatePointType = {
  lat: number;
  lng: number;
};
