import { LanguageType } from './language';
import { WorkspaceDTOType } from './workspace';

export enum UserStateType {
  Pending = 'pending',
  Activated = 'activated',
  Deactivated = 'deactivated',
}

export type LinkedInWorkerDTOType = {
  monday: string;
  mondayTasks: Record<string, boolean>;

  tuesday: string;
  tuesdayTasks: Record<string, boolean>;

  wednesday: string;
  wednesdayTasks: Record<string, boolean>;

  thursday: string;
  thursdayTasks: Record<string, boolean>;

  friday: string;
  fridayTasks: Record<string, boolean>;

  saturday: string;
  saturdayTasks: Record<string, boolean>;

  sunday: string;
  sundayTasks: Record<string, boolean>;
};

export enum UserRoleType {
  User = 'user',
  Admin = 'admin',
  Owner = 'owner',
}

export enum UserTypes {
  User = 'User',
  LinkedInExtension = 'LinkedInExtension',
}

export type UserMetricsType = {
  numberOfLinkedInMessages: number;
  numberOfLinkedInConnections: number;
};

export type UserDTOType = Partial<UserMetricsType> & {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  language: LanguageType;
  updatedAt: string;
  createdAt: string;
} & Partial<{ workspaces: WorkspaceDTOType[]; workspace: WorkspaceDTOType }>;
