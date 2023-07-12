import { UserRoleType, UserStateType } from './users';

export enum WorkspaceTaskPriority {
  Low = 'low',
  High = 'high',
  None = 'none',
  Medium = 'medium',
}

export type WorkspaceType = {
  priority: WorkspaceTaskPriority;
};

export enum WorkspaceSetupState {
  Open = 'open',
  Completed = 'completed',
  Subscribe = 'subscribe',
  Cancelled = 'cancelled',
  ConnectCRM = 'connect-crm',
  VerifyEmail = 'verify-email',
  CreatePersona = 'create-persona',
  PrepareBrowser = 'prepare-browser',
}

export type WorkspaceDTOType = {
  id: string;
  name: string;
  website: string;
  updateAt: string;
  createdAt: string;
  isExpired: boolean;
  role: UserRoleType;
  state: UserStateType;
  expiresAt: null | number;

  systemFeatures?: Record<string, string | number | boolean>;

  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
};
